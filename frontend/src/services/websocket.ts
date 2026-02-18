import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface WebSocketMessage {
  type: string;
  data?: any;
  timestamp?: string;
  userId?: number;
  username?: string;
  boardId?: number;
}

type MessageCallback = (message: WebSocketMessage) => void;

class WebSocketService {
  private client: Client | null = null;
  private connected: boolean = false;
  private subscriptions: Map<string, any> = new Map();
  private messageCallbacks: Map<number, MessageCallback[]> = new Map();

  /**
   * Connect to WebSocket server with JWT authentication
   */
  connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.connected) {
        resolve();
        return;
      }

      try {
        this.client = new Client({
          webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
          connectHeaders: {
            Authorization: `Bearer ${token}`,
          },
          debug: (str) => {
            console.log('[WebSocket Debug]', str);
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
          onConnect: () => {
            console.log('✅ WebSocket connected successfully');
            this.connected = true;
            resolve();
          },
          onStompError: (frame) => {
            console.error('❌ WebSocket STOMP error:', frame.headers['message']);
            console.error('Details:', frame.body);
            this.connected = false;
            reject(new Error(frame.headers['message']));
          },
          onWebSocketError: (error) => {
            console.error('❌ WebSocket connection error:', error);
            this.connected = false;
            reject(error);
          },
          onDisconnect: () => {
            console.log('🔌 WebSocket disconnected');
            this.connected = false;
          },
        });

        this.client.activate();
      } catch (error) {
        console.error('❌ Failed to create WebSocket client:', error);
        reject(error);
      }
    });
  }

  /**
   * Subscribe to board updates
   */
  subscribeToBoard(boardId: number, callback: MessageCallback): void {
    if (!this.client || !this.connected) {
      console.warn('⚠️ WebSocket not connected. Cannot subscribe to board:', boardId);
      return;
    }

    const destination = `/topic/board/${boardId}`;
    const subscriptionKey = `board-${boardId}`;

    // Store callback
    if (!this.messageCallbacks.has(boardId)) {
      this.messageCallbacks.set(boardId, []);
    }
    this.messageCallbacks.get(boardId)?.push(callback);

    // Only subscribe once per board
    if (this.subscriptions.has(subscriptionKey)) {
      console.log('📡 Already subscribed to board:', boardId);
      return;
    }

    const subscription = this.client.subscribe(destination, (message: IMessage) => {
      try {
        const data: WebSocketMessage = JSON.parse(message.body);
        console.log('📨 Received WebSocket message:', data);

        // Call all callbacks for this board
        const callbacks = this.messageCallbacks.get(boardId) || [];
        callbacks.forEach((cb) => cb(data));
      } catch (error) {
        console.error('❌ Failed to parse WebSocket message:', error);
      }
    });

    this.subscriptions.set(subscriptionKey, subscription);
    console.log('✅ Subscribed to board updates:', boardId);

    // Send subscription acknowledgment
    this.sendMessage(`/app/board/${boardId}/subscribe`, {});
  }

  /**
   * Unsubscribe from board updates
   */
  unsubscribeFromBoard(boardId: number): void {
    const subscriptionKey = `board-${boardId}`;
    const subscription = this.subscriptions.get(subscriptionKey);

    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(subscriptionKey);
      this.messageCallbacks.delete(boardId);
      console.log('🔕 Unsubscribed from board:', boardId);
    }
  }

  /**
   * Send a message to the server
   */
  sendMessage(destination: string, body: any): void {
    if (!this.client || !this.connected) {
      console.warn('⚠️ WebSocket not connected. Cannot send message.');
      return;
    }

    this.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }

  /**
   * Send card move event
   */
  sendCardMove(boardId: number, cardId: number, newListId: number, newPosition: number): void {
    this.sendMessage(`/app/board/${boardId}/card-move`, {
      cardId,
      newListId,
      newPosition,
    });
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect(): void {
    if (this.client) {
      // Unsubscribe from all topics
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
      this.subscriptions.clear();
      this.messageCallbacks.clear();

      // Deactivate client
      this.client.deactivate();
      this.client = null;
      this.connected = false;
      console.log('👋 WebSocket disconnected');
    }
  }

  /**
   * Check if WebSocket is connected
   */
  isConnected(): boolean {
    return this.connected;
  }
}

// Export singleton instance
export const websocketService = new WebSocketService();


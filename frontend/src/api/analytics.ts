import api from './axios';

export interface AnalyticsOverview {
  totalCardsCreated: number;
  totalCardsMoved: number;
  totalBoardsCreated: number;
  totalListsCreated: number;
  avgMovesPerCard: number;
  timestamp: number;
}

export interface CardMetrics {
  totalCreated: number;
  totalMoved: number;
  priorityDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  timestamp: number;
}

export interface BoardMetrics {
  totalCreated: number;
  timestamp: number;
}

export interface AllMetrics {
  metrics: Record<string, number>;
  timestamp: number;
}

export const analyticsApi = {
  getOverview: async (): Promise<AnalyticsOverview> => {
    const response = await api.get<AnalyticsOverview>('/analytics/overview');
    return response.data;
  },

  getCardMetrics: async (): Promise<CardMetrics> => {
    const response = await api.get<CardMetrics>('/analytics/cards');
    return response.data;
  },

  getBoardMetrics: async (): Promise<BoardMetrics> => {
    const response = await api.get<BoardMetrics>('/analytics/boards');
    return response.data;
  },

  getAllMetrics: async (): Promise<AllMetrics> => {
    const response = await api.get<AllMetrics>('/analytics');
    return response.data;
  },

  resetMetrics: async (): Promise<void> => {
    await api.get('/analytics/reset');
  },
};


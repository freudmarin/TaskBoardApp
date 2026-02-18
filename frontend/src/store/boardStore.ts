import { create } from 'zustand';
import { Board, List, Card, CreateBoardRequest, CreateListRequest, CreateCardRequest, CardMoveRequest } from '../types';
import { boardApi, listApi, cardApi } from '../api';

interface BoardState {
  boards: Board[];
  currentBoard: Board | null;
  loading: boolean;
  error: string | null;

  // Board actions
  fetchBoards: () => Promise<void>;
  fetchBoard: (id: number) => Promise<void>;
  createBoard: (data: CreateBoardRequest) => Promise<Board>;
  updateBoard: (id: number, data: CreateBoardRequest) => Promise<void>;
  deleteBoard: (id: number) => Promise<void>;

  // List actions
  createList: (data: CreateListRequest) => Promise<List>;
  updateList: (id: number, data: CreateListRequest) => Promise<void>;
  deleteList: (id: number) => Promise<void>;

  // Card actions
  createCard: (data: CreateCardRequest) => Promise<Card>;
  updateCard: (id: number, data: CreateCardRequest) => Promise<void>;
  moveCard: (id: number, data: CardMoveRequest) => Promise<void>;
  deleteCard: (id: number) => Promise<void>;

  // Local state update
  moveCardLocally: (cardId: number, sourceListId: number, destListId: number, newPosition: number) => void;
  clearError: () => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  boards: [],
  currentBoard: null,
  loading: false,
  error: null,

  fetchBoards: async () => {
    set({ loading: true, error: null });
    try {
      const boards = await boardApi.getAll();
      set({ boards, loading: false });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch boards';
      set({ error: errorMessage, loading: false });
    }
  },

  fetchBoard: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const board = await boardApi.getById(id);
      set({ currentBoard: board, loading: false });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch board';
      set({ error: errorMessage, loading: false });
    }
  },

  createBoard: async (data: CreateBoardRequest) => {
    set({ loading: true, error: null });
    try {
      const board = await boardApi.create(data);
      set((state) => ({
        boards: [...state.boards, board],
        loading: false
      }));
      return board;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create board';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  updateBoard: async (id: number, data: CreateBoardRequest) => {
    set({ loading: true, error: null });
    try {
      const board = await boardApi.update(id, data);
      set((state) => ({
        boards: state.boards.map((b) => (b.id === id ? board : b)),
        currentBoard: state.currentBoard?.id === id ? board : state.currentBoard,
        loading: false,
      }));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update board';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  deleteBoard: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await boardApi.delete(id);
      set((state) => ({
        boards: state.boards.filter((b) => b.id !== id),
        currentBoard: state.currentBoard?.id === id ? null : state.currentBoard,
        loading: false,
      }));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete board';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  createList: async (data: CreateListRequest) => {
    set({ loading: true, error: null });
    try {
      const list = await listApi.create(data);
      set((state) => {
        if (state.currentBoard && state.currentBoard.id === data.boardId) {
          return {
            currentBoard: {
              ...state.currentBoard,
              lists: [...state.currentBoard.lists, { ...list, cards: [] }],
            },
            loading: false,
          };
        }
        return { loading: false };
      });
      return list;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create list';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  updateList: async (id: number, data: CreateListRequest) => {
    set({ loading: true, error: null });
    try {
      const list = await listApi.update(id, data);
      set((state) => {
        if (state.currentBoard) {
          return {
            currentBoard: {
              ...state.currentBoard,
              lists: state.currentBoard.lists.map((l) =>
                l.id === id ? { ...l, ...list } : l
              ),
            },
            loading: false,
          };
        }
        return { loading: false };
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update list';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  deleteList: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await listApi.delete(id);
      set((state) => {
        if (state.currentBoard) {
          return {
            currentBoard: {
              ...state.currentBoard,
              lists: state.currentBoard.lists.filter((l) => l.id !== id),
            },
            loading: false,
          };
        }
        return { loading: false };
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete list';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  createCard: async (data: CreateCardRequest) => {
    set({ loading: true, error: null });
    try {
      const card = await cardApi.create(data);
      set((state) => {
        if (state.currentBoard) {
          return {
            currentBoard: {
              ...state.currentBoard,
              lists: state.currentBoard.lists.map((l) =>
                l.id === data.listId
                  ? { ...l, cards: [...l.cards, card] }
                  : l
              ),
            },
            loading: false,
          };
        }
        return { loading: false };
      });
      return card;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create card';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  updateCard: async (id: number, data: CreateCardRequest) => {
    set({ loading: true, error: null });
    try {
      const card = await cardApi.update(id, data);
      set((state) => {
        if (state.currentBoard) {
          return {
            currentBoard: {
              ...state.currentBoard,
              lists: state.currentBoard.lists.map((l) => ({
                ...l,
                cards: l.cards.map((c) => (c.id === id ? card : c)),
              })),
            },
            loading: false,
          };
        }
        return { loading: false };
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update card';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  moveCard: async (id: number, data: CardMoveRequest) => {
    try {
      await cardApi.move(id, data);
      // Refetch board to get updated state
      const { currentBoard } = get();
      if (currentBoard) {
        const board = await boardApi.getById(currentBoard.id);
        set({ currentBoard: board });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to move card';
      set({ error: errorMessage });
      throw error;
    }
  },

  deleteCard: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await cardApi.delete(id);
      set((state) => {
        if (state.currentBoard) {
          return {
            currentBoard: {
              ...state.currentBoard,
              lists: state.currentBoard.lists.map((l) => ({
                ...l,
                cards: l.cards.filter((c) => c.id !== id),
              })),
            },
            loading: false,
          };
        }
        return { loading: false };
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete card';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  moveCardLocally: (cardId: number, sourceListId: number, destListId: number, newPosition: number) => {
    set((state) => {
      if (!state.currentBoard) return state;

      const lists = [...state.currentBoard.lists];
      const sourceList = lists.find((l) => l.id === sourceListId);
      const destList = lists.find((l) => l.id === destListId);

      if (!sourceList || !destList) return state;

      const cardIndex = sourceList.cards.findIndex((c) => c.id === cardId);
      if (cardIndex === -1) return state;

      const [card] = sourceList.cards.splice(cardIndex, 1);
      card.listId = destListId;
      card.position = newPosition;

      destList.cards.splice(newPosition, 0, card);

      // Update positions
      destList.cards.forEach((c, i) => {
        c.position = i;
      });

      return {
        currentBoard: {
          ...state.currentBoard,
          lists,
        },
      };
    });
  },

  clearError: () => set({ error: null }),
}));


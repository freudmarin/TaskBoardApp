import api from './axios';
import { Board, CreateBoardRequest } from '../types';

export const boardApi = {
  getAll: async (): Promise<Board[]> => {
    const response = await api.get<Board[]>('/boards');
    return response.data;
  },

  getById: async (id: number): Promise<Board> => {
    const response = await api.get<Board>(`/boards/${id}`);
    return response.data;
  },

  create: async (data: CreateBoardRequest): Promise<Board> => {
    const response = await api.post<Board>('/boards', data);
    return response.data;
  },

  update: async (id: number, data: CreateBoardRequest): Promise<Board> => {
    const response = await api.put<Board>(`/boards/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/boards/${id}`);
  },
};


import api from './axios';
import { List, CreateListRequest } from '../types';

export const listApi = {
  getByBoardId: async (boardId: number): Promise<List[]> => {
    const response = await api.get<List[]>(`/lists/board/${boardId}`);
    return response.data;
  },

  getById: async (id: number): Promise<List> => {
    const response = await api.get<List>(`/lists/${id}`);
    return response.data;
  },

  create: async (data: CreateListRequest): Promise<List> => {
    const response = await api.post<List>('/lists', data);
    return response.data;
  },

  update: async (id: number, data: CreateListRequest): Promise<List> => {
    const response = await api.put<List>(`/lists/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/lists/${id}`);
  },
};


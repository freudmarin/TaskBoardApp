import api from './axios';
import { Card, CreateCardRequest, CardMoveRequest } from '../types';

export const cardApi = {
  getByListId: async (listId: number): Promise<Card[]> => {
    const response = await api.get<Card[]>(`/cards/list/${listId}`);
    return response.data;
  },

  getById: async (id: number): Promise<Card> => {
    const response = await api.get<Card>(`/cards/${id}`);
    return response.data;
  },

  create: async (data: CreateCardRequest): Promise<Card> => {
    const response = await api.post<Card>('/cards', data);
    return response.data;
  },

  update: async (id: number, data: CreateCardRequest): Promise<Card> => {
    const response = await api.put<Card>(`/cards/${id}`, data);
    return response.data;
  },

  move: async (id: number, data: CardMoveRequest): Promise<Card> => {
    const response = await api.post<Card>(`/cards/${id}/move`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/cards/${id}`);
  },
};


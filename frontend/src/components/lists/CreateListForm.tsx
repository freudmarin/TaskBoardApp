import React, { useState } from 'react';
import { useBoardStore } from '../../store/boardStore';
import { Button } from '../common/Button';

interface CreateListFormProps {
  boardId: number;
  onCancel: () => void;
  onSuccess: () => void;
}

export const CreateListForm: React.FC<CreateListFormProps> = ({
  boardId,
  onCancel,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { createList, loading } = useBoardStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('List name is required');
      return;
    }

    try {
      await createList({
        name: name.trim(),
        boardId,
      });
      setName('');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to create list');
    }
  };

  return (
    <div className="flex-shrink-0 w-72 bg-gray-100 rounded-lg p-3">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-600 text-xs mb-2">{error}</div>
        )}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter list name..."
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          autoFocus
        />
        <div className="flex space-x-2">
          <Button
            type="submit"
            size="sm"
            loading={loading}
            className="flex-1"
          >
            Add List
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};


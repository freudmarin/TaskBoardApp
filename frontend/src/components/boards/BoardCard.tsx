import React from 'react';
import { Board } from '../../types';
import { Button } from '../common/Button';

interface BoardCardProps {
  board: Board;
  onClick: () => void;
  onDelete: () => void;
}

export const BoardCard: React.FC<BoardCardProps> = ({ board, onClick, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      <div
        className="h-24"
        style={{ backgroundColor: board.color || '#3B82F6' }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{board.name}</h3>
        {board.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{board.description}</p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{board.lists.length} lists</span>
          <span>
            {board.lists.reduce((acc, list) => acc + list.cards.length, 0)} cards
          </span>
        </div>
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          className="shadow-md"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};


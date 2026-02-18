import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { List } from '../../types';
import { useBoardStore } from '../../store/boardStore';
import { Button } from '../common/Button';
import { CardItem } from '../cards/CardItem';
import { CreateCardModal } from '../cards/CreateCardModal';

interface ListViewProps {
  list: List;
}

export const ListView: React.FC<ListViewProps> = ({ list }) => {
  const { deleteList } = useBoardStore();
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [listName, setListName] = useState(list.name);
  const { updateList } = useBoardStore();

  const { setNodeRef } = useDroppable({
    id: `list-${list.id}`,
    data: {
      type: 'list',
      list,
    },
  });

  const cardIds = list.cards.map((card) => card.id);

  const handleDeleteList = async () => {
    if (window.confirm(`Are you sure you want to delete "${list.name}"?`)) {
      try {
        await deleteList(list.id);
      } catch (error) {
        console.error('Failed to delete list:', error);
      }
    }
  };

  const handleUpdateName = async () => {
    if (listName.trim() && listName !== list.name) {
      try {
        await updateList(list.id, {
          name: listName.trim(),
          boardId: list.boardId,
          position: list.position,
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update list:', error);
        setListName(list.name);
      }
    } else {
      setIsEditing(false);
      setListName(list.name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdateName();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setListName(list.name);
    }
  };

  return (
    <div className="flex-shrink-0 w-72 bg-gray-100 rounded-lg p-3">
      <div className="flex justify-between items-center mb-3">
        {isEditing ? (
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            onBlur={handleUpdateName}
            onKeyDown={handleKeyDown}
            className="flex-1 px-2 py-1 text-sm font-semibold border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
        ) : (
          <h3
            className="text-sm font-semibold text-gray-900 cursor-pointer hover:text-gray-700"
            onClick={() => setIsEditing(true)}
          >
            {list.name}
          </h3>
        )}
        <button
          onClick={handleDeleteList}
          className="ml-2 text-gray-500 hover:text-red-600 transition-colors"
          title="Delete list"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        ref={setNodeRef}
        className="space-y-2 mb-3 max-h-[calc(100vh-300px)] overflow-y-auto min-h-[100px]"
      >
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {list.cards
            .sort((a, b) => a.position - b.position)
            .map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
        </SortableContext>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCreateCardModalOpen(true)}
        className="w-full justify-center"
      >
        + Add Card
      </Button>

      <CreateCardModal
        isOpen={isCreateCardModalOpen}
        onClose={() => setIsCreateCardModalOpen(false)}
        listId={list.id}
      />
    </div>
  );
};


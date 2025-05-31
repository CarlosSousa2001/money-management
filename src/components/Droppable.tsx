// components/Droppable.tsx
import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

export function Droppable({ id, children }: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        border: isOver ? '2px solid green' : '2px dashed gray',
        padding: '1rem',
        minHeight: '150px',
      }}
    >
      {children}
    </div>
  );
}

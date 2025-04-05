import React, { useState } from 'react'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const TaskCardTry = ({ task, deleteTask, updateTask }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseOver(false);
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="bg-gray-600 p-2.5 h-[100px] relative min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab"></div>;
  }

  if (editMode) {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='bg-gray-600 p-2.5 h-[100px] relative min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab'>
        <textarea className='h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none' value={task.content} autoFocus placeholder="Tasks content" onBlur={toggleEditMode} onKeyDown={e => { if (e.key === "Enter") toggleEditMode() }} onChange={e => updateTask(task.id, e.target.value)}></textarea>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={toggleEditMode} onMouseEnter={() => { setMouseOver(true) }} onMouseLeave={() => { setMouseOver(false) }} className='bg-gray-600 p-2.5 h-[100px] relative min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab'>
      {task.content}
      {mouseOver && <button onClick={() => { deleteTask(task.id) }} className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-gray-600 p-2 rounded">x</button>}
    </div>
  );
};

export default TaskCardTry;

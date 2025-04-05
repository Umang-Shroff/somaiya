import React, { useState, useMemo } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCardTry from './TaskCardTry';

const KanbanTry = () => {
  const [columns, setColumns] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [tasks, setTasks] = useState([]);

  const tasksIds = useMemo(() => {
    return tasks.map(task => task.id);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      }
    })
  );

  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

  const createNewColumn = () => {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  const deleteColumn = (id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(newTasks);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) {
      return;
    }

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);
      const overColumnIndex = columns.findIndex(col => col.id === overColumnId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const updateColumn = (id, title) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  };

  const createTask = (columnId) => {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateTask = (id, content) => {
    const newTasks = tasks.map(task => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  };

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      return;
    }

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId);
        const overIndex = tasks.findIndex(t => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
        }
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveATask && isOverAColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <div className='z-50 m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]'>
      <DndContext onDragOver={onDragOver} sensors={sensors} onDragEnd={onDragEnd}>
        <div className='z-50 m-auto flex gap-4'>
          <div className='flex gap-4'>
            <SortableContext items={columnsId}>
              {columns.map(col => {
                const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
                  id: col.id, // Use the column's id here
                  data: {
                    type: "Column",
                    column: col,
                  },
                  disabled: editMode,
                });

                const style = {
                  transition,
                  transform: CSS.Transform.toString(transform),
                };

                return (
                  <div ref={setNodeRef} style={style} key={col.id} className="z-50 bg-gray-600 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
                    <div {...attributes} {...listeners} onClick={() => { setEditMode(true); }} className='bg-gray-700 text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 border-gray-400 flex items-center justify-between'>
                      <div className='flex gap-2'>
                        <div className='flex justify-center items-center bg-gray-600 px-2 py-1 text-sm rounded-full'>0</div>
                        {!editMode && col.title}
                        {editMode && <input className="bg-black focus:border-rose-500 border rounded outline-none px-2" value={col.title} onChange={e => updateColumn(col.id, e.target.value)} autoFocus onBlur={() => { setEditMode(false) }} onKeyDown={e => { if (e.key !== "Enter") return; setEditMode(false) }} />}
                      </div>
                      <button onClick={() => { deleteColumn(col.id) }} className='stroke-gray-500 hover:stroke-white hover:bg-gray-600 rounded px-1 py-2'>x</button>
                    </div>

                    <div className='flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto'>
                      <SortableContext items={tasksIds}>
                        {tasks.filter((task) => task.columnId === col.id).map((task) => (
                          <TaskCardTry key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                        ))}
                      </SortableContext>
                    </div>

                    <button onClick={() => { createTask(col.id) }} className='flex border-gray-400 border-2 rounded-md p-4 hover:bg-gray-600 hover:text-rose-500 active:bg-black'>+ Add task</button>
                  </div>
                );
              })}
            </SortableContext>
          </div>
          <button onClick={() => { createNewColumn() }} className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-gray-600 border-2 border-gray-300 p-4 ring-red-400 hover:ring-2">+ Add Column</button>
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanTry;

import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import './App.scss';

function App() {
  const [items, setItems] = useState([
    {name: 'Pending', id: 'column-1', tasks: []},
    {name: 'In Progress', id: 'column-2', tasks: []},
    {name: 'To Be Reviewed', id: 'column-3', tasks: []},
    {name: 'Ready for Test', id: 'column-4', tasks: []},
    {name: 'Done', id: 'column-5', tasks: []},
  ]);
  const addTaskHandler = (statusId, taskValue) => {
    const newItems = items.map((status) => {
      if (status.id === statusId) {
        const id = String(Math.floor(Math.random() * (100 - 1) + 1));
        return {
          ...status,
          tasks: [
            ...status.tasks,
            {
              id,
              description: id + ': ' + taskValue,
            },
          ],
        };
      }
      return status;
    });
    setItems(newItems);
  };
  const deleteTaskHandler = (statusId, taskId) => {
    const newItems = items.map((status) => {
      if (status.id === statusId) {
        return {
          ...status,
          tasks: status.tasks.filter((task) => task.id !== taskId),
        };
      }
      return status;
    });
    setItems(newItems);
  };

  const onDragEnd = (result) => {
    const {destination, source} = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = items.findIndex((i) => i.id === source.droppableId);
    const finish = items.findIndex((i) => i.id === destination.droppableId);
    // If dragging in same column
    if (start === finish) {
      const newTasks = [...items[finish].tasks];
      let [deletedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, deletedTask);

      const newFinish = {
        ...items[finish],
        tasks: newTasks,
      };

      const newItems = [...items];
      newItems[finish] = newFinish;
      setItems(newItems);
      return;
    }

    // Moving from one list to another
    const startTasks = [...items[start].tasks];
    let [deletedTask] = startTasks.splice(source.index, 1);
    const newStart = {
      ...items[start],
      tasks: startTasks,
    };
    let newItems = [...items];
    newItems[start] = newStart;

    const finishTasks = [...items[finish].tasks];
    finishTasks.splice(destination.index, 0, deletedTask);
    const newFinish = {
      ...items[finish],
      tasks: finishTasks,
    };
    newItems[finish] = newFinish;
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col">
        <h3 className="text-xl">Tasks</h3>
        <div className="flex justify-between ">
          {items.map((item) => (
            <div
              className="flex flex-col p-2 border-2 border-gray-700"
              key={item.id}>
              <div className="flex justify-between">
                <h5>{item.name}</h5>
                <button
                  className="px-2 ml-2 text-white bg-blue-700 border-blue-900 rounded-full border-1"
                  onClick={() =>
                    addTaskHandler(item.id, `New task under ${item.name}`)
                  }>
                  Add Task
                </button>
              </div>
              <Droppable droppableId={item.id}>
                {(provided) => (
                  <div
                    className="flex flex-col flex-1 min-h-max"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {item.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}>
                        {(Provided) => (
                          <div
                            className="flex justify-between py-2"
                            ref={Provided.innerRef}
                            {...Provided.draggableProps}
                            {...Provided.dragHandleProps}>
                            <h6>{task.description}</h6>
                            <button
                              className="px-2 ml-2 text-white bg-red-700 border-red-900 rounded-full border-1"
                              onClick={() =>
                                deleteTaskHandler(item.id, task.id)
                              }>
                              Delete Task
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;

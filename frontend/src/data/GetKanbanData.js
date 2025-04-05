export const GetKanbanData = () => {
    return [
      {
        taskId: 1,
        title: 'Task 1',
        description: 'Analyze the new requirements gathered from the customer.',
        toDo: true,
        inProgress: false,
        testing: false,
        done: false,
      },
      {
        taskId: 2,
        title: 'Task 2',
        description: 'Fix the issues reported in the IE browser.',
        toDo: false,
        inProgress: true,
        testing: false,
        done: false,
      },
      {
        taskId: 3,
        title: 'Task 3',
        description: 'Fix the issues reported by the customer.',
        toDo: false,
        inProgress: false,
        testing: true,
        done: false,
      },
      {
        taskId: 4,
        title: 'Task 4',
        description: 'Arrange a web meeting with the customer to get the login page requirements.',
        toDo: false,
        inProgress: false,
        testing: false,
        done: true,
      },
      // Add more tasks as necessary
    ];
  };
  
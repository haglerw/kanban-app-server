const { v4: uuidv4 } = require("uuid");

const firstColumn = uuidv4();
const secondColumn = uuidv4();
const thirdColumn = uuidv4();
const fourthColumn = uuidv4();
const fifthColumn = uuidv4();

const kanbanData = [
  {
    id: firstColumn,
    name: "To Do",
    tasks: [
      { id: uuidv4(), name: "Task 1", columnID: firstColumn },
      { id: uuidv4(), name: "Task 2", columnID: firstColumn },
    ],
  },
  {
    id: secondColumn,
    name: "In Progress",
    tasks: [
      { id: uuidv4(), name: "Task 3", columnID: secondColumn },
      { id: uuidv4(), name: "Task 4", columnID: secondColumn },
    ],
  },
  {
    id: thirdColumn,
    name: "Testing",
    tasks: [
      { id: uuidv4(), name: "Task 5", columnID: thirdColumn },
      { id: uuidv4(), name: "Task 6", columnID: thirdColumn },
    ],
  },
  {
    id: fourthColumn,
    name: "Review",
    tasks: [
      { id: uuidv4(), name: "Task 7", columnID: fourthColumn },
      { id: uuidv4(), name: "Task 8", columnID: fourthColumn },
    ],
  },
  {
    id: fifthColumn,
    name: "Done",
    tasks: [
      { id: uuidv4(), name: "Task 9", columnID: fifthColumn },
      { id: uuidv4(), name: "Task 10", columnID: fifthColumn },
    ],
  },
];

const resolvers = {
  Query: {
    columns: () => kanbanData,
  },
  Mutation: {
    addColumn: (_, { name }) => {
      const newColumn = {
        id: uuidv4(),
        name,
        tasks: [],
      };
      kanbanData.push(newColumn);
      return newColumn;
    },
    editColumn: (_, { id, name }) => {
      const column = kanbanData.find((c) => c.id === id);
      if (column) {
        column.name = name;
        return column;
      }
    },
    deleteColumn: (_, { id }) => {
      const columnIndex = kanbanData.findIndex((c) => c.id === id);
      if (columnIndex !== -1) {
        const deletedColumn = kanbanData.splice(columnIndex, 1);
        return deletedColumn[0];
      }

      return null;
    },
    addTask: (_, { taskInput }) => {
      const newTask = {
        id: uuidv4(),
        name: taskInput.name,
        columnID: taskInput.columnID,
      };
      const column = kanbanData.find((c) => c.id === taskInput.columnID);
      if (!column) {
        throw new Error("Column not found");
      }

      column.tasks.push(newTask);
      return newTask;
    },
    clearTasks: (_, { columnID }) => {
      const column = kanbanData.find((col) => col.id === columnID);
      if (column) {
        column.tasks = [];
        return true;
      }
      return false;
    },
    moveTask: (_, { taskID, fromColumnID, toColumnID }) => {
      // Find the 'from' column
      const fromColumn = kanbanData.find((col) => col.id === fromColumnID);

      // Find the 'to' column
      const toColumn = kanbanData.find((col) => col.id === toColumnID);

      if (fromColumn && toColumn) {
        // Find the task being moved
        const taskIndex = fromColumn.tasks.findIndex(
          (task) => task.id === taskID
        );

        if (taskIndex !== -1) {
          // Remove the task from the 'from' column
          const task = fromColumn.tasks.splice(taskIndex, 1)[0];

          // Add the task to the 'to' column
          toColumn.tasks.push(task);
          return true;
        }
      }

      return false;
    },
  },
};

module.exports = resolvers;

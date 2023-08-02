const { gql } = require("apollo-server");

const typeDefs = gql`
  type Task {
    id: ID!
    name: String!
    columnID: ID!
  }

  type Column {
    id: ID!
    name: String!
    tasks: [Task]
  }

  input TaskInput {
    name: String!
    columnID: ID!
  }

  type Query {
    columns: [Column]
  }

  type Mutation {
    addColumn(name: String!): Column
    editColumn(id: ID!, name: String!): Column
    deleteColumn(id: ID!): Column
    addTask(taskInput: TaskInput!): Task
    clearTasks(columnID: ID!): Boolean
    moveTask(taskID: ID!, fromColumnID: ID!, toColumnID: ID!): Boolean
  }
`;

module.exports = typeDefs;

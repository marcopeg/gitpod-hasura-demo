import { useState } from "react";
import { gql } from "apollo-boost";
import { useSubscription, useMutation } from "@apollo/react-hooks";

const FETCH_TODOS = gql`
  subscription todosList {
    todos {
      id
      text
      completed
    }
  }
`;

const REMOVE_TODO = gql`
  mutation removeTodo($id: Int!) {
    delete_todos(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    insert_todos(objects: { text: $text }) {
      affected_rows
    }
  }
`;

export const useTodos = () => {
  const { data, loading } = useSubscription(FETCH_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [deleteTodo] = useMutation(REMOVE_TODO);
  const [deleting, setDeleting] = useState([]);

  const addTodoHandler = text => addTodo({ variables: { text } });

  // Remove a todo with an optimistic update approach
  const deleteTodoHandler = todo => async () => {
    setDeleting(v => [...v, todo.id]);
    try {
      await deleteTodo({
        variables: { id: todo.id }
      });
    } catch (err) {
      console.error(err.message);
      setDeleting(v => v.filter(id => id !== todo.id));
    }
  };

  // Presents only the todos that should be visible
  const todoItems = data
    ? data.todos.filter(todo => !deleting.includes(todo.id))
    : [];

  return {
    loading,
    todos: todoItems,
    addTodo: addTodoHandler,
    deleteTodo: deleteTodoHandler
  };
};

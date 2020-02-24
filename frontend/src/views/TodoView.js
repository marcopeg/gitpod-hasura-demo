import React from "react";
import { gql } from "apollo-boost";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddTodo from "../controllers/AddTodo";

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

const TodoView = () => {
  const { data } = useSubscription(FETCH_TODOS);
  const [deleteTodo] = useMutation(REMOVE_TODO);

  const handleDeleteRequest = todo => () =>
    deleteTodo({
      variables: { id: todo.id }
    });

  // Transform todods subscription data into a body
  const todoItems = data ? data.todos : [];
  const todoNodes = todoItems.map(todo => (
    <li key={todo.id} onClick={handleDeleteRequest(todo)}>
      {todo.text}
    </li>
  ));

  return (
    <>
      <Card variant="outlined" style={{ marginBottom: 20 }}>
        <CardContent>
          <Typography>Stuff to do:</Typography>
          {todoNodes}
        </CardContent>
      </Card>
      <AddTodo />
    </>
  );
};

export default TodoView;

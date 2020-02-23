import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    insert_todos(objects: { text: $text }) {
      affected_rows
    }
  }
`;

const AddTodo = () => {
  const [addTodo] = useMutation(ADD_TODO);

  const login = evt => {
    evt.preventDefault();
    // Trigger the update
    const text = evt.target.elements.text.value;
    addTodo({ variables: { text } });

    // Reset the input field
    evt.target.elements.text.value = "";
    evt.target.elements.text.focus();
  };

  return (
    <form onSubmit={login}>
      <input type="text" name="text" placeholder="...buy milk" />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;

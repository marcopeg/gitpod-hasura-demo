import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

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
    <Card variant="outlined">
      <CardContent>
        <Typography>Create new todo:</Typography>
        <form onSubmit={login}>
          <Grid container>
            <Grid item>
              <TextField label="todo" name="text" />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTodo;

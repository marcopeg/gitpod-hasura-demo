import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2)
  }
}));

const AddTodo = () => {
  const classes = useStyles();
  const [addTodo] = useMutation(ADD_TODO);

  const handleFormSubmit = evt => {
    evt.preventDefault();
    // Trigger the update
    const text = evt.target.elements.text.value;
    addTodo({ variables: { text } });

    // Reset the input field
    evt.target.elements.text.value = "";
    evt.target.elements.text.focus();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography>New Todo:</Typography>
          <TextField fullWidth placeholder="buy milk..." name="text" />
        </CardContent>
      </Card>
      <Button type="submit" color="primary" variant="contained">
        Save
      </Button>
    </form>
  );
};

export default AddTodo;

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2)
  }
}));

const AddTodo = ({ onSubmit: addTodo }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async evt => {
    evt.preventDefault();
    setLoading(true);

    try {
      const inputEl = evt.target.elements.text;
      await addTodo(inputEl.value);
      inputEl.value = "";
      inputEl.focus();
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
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
        {loading ? "..." : "save"}
      </Button>
    </form>
  );
};

export default AddTodo;

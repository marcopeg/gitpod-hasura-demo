import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2)
  }
}));

const ListTodos = ({ items, isLoading, onDeleteItem }) => {
  const classes = useStyles();

  const makeBody = () => {
    if (isLoading) {
      return <LinearProgress />;
    }

    if (!items.length) {
      return (
        <>
          <Typography variant="h6">
            <span role="img" aria-label="smile">
              😎
            </span>{" "}
            You are set!
          </Typography>
          <Typography>
            ...or you can add new stuff on your list using the form below
          </Typography>
        </>
      );
    }

    return (
      <>
        <Typography variant="h6">My List:</Typography>
        <List>
          {items.map(todo => (
            <React.Fragment key={todo.id}>
              <ListItem button onClick={onDeleteItem(todo)}>
                <ListItemText>{todo.text}</ListItemText>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </>
    );
  };

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>{makeBody()}</CardContent>
    </Card>
  );
};

export default ListTodos;

import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

const ListTodos = ({ items, isLoading, onDeleteItem }) => {
  // Transform todods subscription data into a body
  const todoNodes = items.map(todo => (
    <li key={todo.id} onClick={onDeleteItem(todo)}>
      {todo.text}
    </li>
  ));

  return (
    <Card variant="outlined" style={{ marginBottom: 20 }}>
      <CardContent>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <>
            <Typography>Stuff to do:</Typography>
            {todoNodes}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ListTodos;

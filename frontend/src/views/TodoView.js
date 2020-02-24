import React from "react";
import ListTodos from "../components/ListTodos";
import AddTodo from "../components/AddTodo";
import { useTodos } from "../lib/use-todos";

const TodoView = () => {
  const { todos, loading, addTodo, deleteTodo } = useTodos();
  return (
    <>
      <ListTodos items={todos} isLoading={loading} onDeleteItem={deleteTodo} />
      {!loading && <AddTodo onSubmit={addTodo} />}
    </>
  );
};

export default TodoView;

import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../../context/TodoContext";

/* eslint-disable react/prop-types */
const TodoList = ({ headTitle, todos }) => {
  const { onDeleteTodoItem, onToggleTodoItem } = useContext(TodoContext);

  return (
    <section>
      <h2>{headTitle}</h2>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDeleteTodoItem={onDeleteTodoItem}
            onToggleTodoItem={onToggleTodoItem}
          />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;

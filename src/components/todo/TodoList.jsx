import TodoItem from './TodoItem';

/* eslint-disable react/prop-types */
const TodoList = ({ headTitle, todos }) => {
    return (
        <section>
            <h2>{headTitle}</h2>
            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </section>
    );
};

export default TodoList;

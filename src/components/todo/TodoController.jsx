import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../../api/todo-api';

const TodoController = () => {
    const {
        data: todos,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos,
        // select: (todos) => {
        //     const sortedTodos = [...todos];
        //     if (sortOrder === 'asc') {
        //         sortedTodos.sort(
        //             (a, b) => new Date(a.deadline) - new Date(b.deadline)
        //         );
        //         return;
        //     }
        //     sortedTodos.sort(
        //         (a, b) => new Date(b.deadline) - new Date(a.deadline)
        //     );
        //     return sortedTodos;
        // },
    });
    const [sortOrder, setSortOrder] = useState('asc');

    const onChangeSortOrder = (e) => {
        const nextSortOrder = e.target.value;

        // NOTE: select UI 변경
        setSortOrder(nextSortOrder);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.log('error:>>', error);
        return <div>Error:{error.message}</div>;
    }

    const workingTodos = todos.filter((todo) => !todo.isDone);
    const doneTodos = todos.filter((todo) => todo.isDone);

    return (
        <main>
            <TodoForm />
            <div>
                <select onChange={onChangeSortOrder} value={sortOrder}>
                    <option value="asc">오름차순</option>
                    <option value="desc">내림차순</option>
                </select>
            </div>
            <TodoList headTitle="Working!" todos={workingTodos} />
            <TodoList headTitle="Done!" todos={doneTodos} />
        </main>
    );
};

export default TodoController;

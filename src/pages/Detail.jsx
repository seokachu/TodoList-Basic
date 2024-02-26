import { useParams } from 'react-router-dom';
import TodoItem from '../components/todo/TodoItem';
import { useDispatch } from 'react-redux';
import { deleteTodo, getSingleTodo } from '../api/todo-api';
import { useQuery } from '@tanstack/react-query';

const Detail = () => {
    const { todoId } = useParams();
    const dispatch = useDispatch();

    const {
        data: todo,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['todo', todoId],
        queryFn: () => getSingleTodo(todoId),
    });

    const handleDeleteTodoItem = async (id) => {
        dispatch(deleteTodo(id));
        // setTodo(null);
    };

    const handleToggleTodoItem = async (id) => {
        dispatch(handleToggleTodoItem(id));
    };

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        console.log('error:>>', error);
    }

    return (
        <section>
            <TodoItem
                todo={todo}
                onDeleteTodoItem={handleDeleteTodoItem}
                onToggleTodoItem={handleToggleTodoItem}
            />
        </section>
    );
};

export default Detail;

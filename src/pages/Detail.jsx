import { useParams } from 'react-router-dom';
import TodoItem from '../components/todo/TodoItem';
import { getSingleTodo } from '../api/todo-api';
import { useQuery } from '@tanstack/react-query';

const Detail = () => {
    const { todoId } = useParams();

    const {
        data: todo,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['todo', todoId],
        queryFn: () => getSingleTodo(todoId),
    });

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        console.log('error:>>', error);
    }

    return (
        <section>
            <TodoItem todo={todo} />
        </section>
    );
};

export default Detail;

import { createTodo } from '../../api/todo-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// uncontrolled component
const TodoForm = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError } = useMutation({
        mutationFn: (nextTodo) => createTodo(nextTodo),
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const content = e.target.content.value;
        const deadline = e.target.deadline.value;

        if (!title || !content) {
            return;
        }

        const nextTodo = {
            id: crypto.randomUUID(),
            title,
            content,
            deadline,
            isDone: false,
        };

        mutate(nextTodo);

        e.target.reset();
    };

    if (isPending) return <div>로딩 중...</div>;
    if (isError) return <div>에러 발생: {isError.message}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="제목" name="title" />
            <input type="text" placeholder="내용" name="content" />
            <input type="date" name="deadline" />
            <button type="submit">제출</button>
        </form>
    );
};

export default TodoForm;

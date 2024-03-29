import axios from 'axios';

export const todoClient = axios.create({
    baseURL: 'http://localhost:4000/todos',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTodos = async () => {
    const { data } = await todoClient.get('/');
    return data;
};

//하나의 투두를 가지고옴
export const getSingleTodo = async (id) => {
    const { data } = await todoClient.get(`/${id}`);
    return data;
};

export const createTodo = async (todo) => {
    await todoClient.post('/', todo);
};

export const deleteTodo = async (id) => {
    await todoClient.delete(`/${id}`);
};

export const updateTodo = async (id, todo) => {
    await todoClient.patch(`/${id}`, todo);
};

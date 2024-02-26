import { createSlice } from '@redux/toolkit';

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
    },
    reducers: {
        sortTodos: (state, action) => {
            const sortOrder = action.payload;
            if (sortOrder === 'asc') {
                state.todos = state.todos.sort(
                    (a, b) => new Date(a.deadline) - new Date(b.deadline)
                );
            } else {
                state.todos = state.todos.sort(
                    (a, b) => new Date(b.deadline) - new Date(a.deadline)
                );
            }
        },
    },
});

// action creator
export const { sortTodos } = todoSlice.actions;

//reducer, action value
export default todoSlice.reducer;

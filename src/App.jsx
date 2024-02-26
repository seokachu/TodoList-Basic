// import TodoProvider from './context/TodoContext';
import Router from './route/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './app/store';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Router />
            </Provider>
        </QueryClientProvider>
    );
};

export default App;

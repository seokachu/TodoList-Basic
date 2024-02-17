import TodoProvider from "./context/TodoContext";
import Router from "./route/Router";

const App = () => {
  return (
    <TodoProvider>
      <Router />
    </TodoProvider>
  );
};

export default App;

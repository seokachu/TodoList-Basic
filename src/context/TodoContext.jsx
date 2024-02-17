import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export const TODOS_COLLECTION = "todos";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, TODOS_COLLECTION));

      const nextTodos = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setTodos(nextTodos);

      // forEach를 사용한 방법
      // const nextTodos = []

      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data()}`);
      //   const data = doc.data();

      //   nextTodos.push({
      //     id: doc.id,
      //     ...data,
      //   });
      // });
    };

    fetchTodos();
  }, []);

  const onSubmitTodo = async (nextTodo) => {
    const ref = await addDoc(collection(db, TODOS_COLLECTION), nextTodo);

    const nextTodoWithServerId = {
      ...nextTodo,
      id: ref.id,
    };

    // optimistic update
    setTodos((prevTodos) => [nextTodoWithServerId, ...prevTodos]);
  };

  const onDeleteTodoItem = async (id) => {
    await deleteDoc(doc(db, TODOS_COLLECTION, id));

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const onToggleTodoItem = async (id) => {
    // 서버의 아이디를 가져와서 업데이트
    const todoRef = doc(db, TODOS_COLLECTION, id);
    const docSnap = await getDoc(todoRef);

    // 또는 클라이언트의 데이터를 가져와서 업데이트
    // const todo = todos.find((todoItem) => todoItem.id === id);
    // await updateDoc(doc(db, TODOS_COLLECTION, id), {
    //   isDone: !todo.isDone,
    // });

    await updateDoc(todoRef, {
      isDone: !docSnap.data().isDone,
    });

    setTodos((prevTodos) =>
      prevTodos.map((todoItem) => {
        if (todoItem.id === id) {
          return {
            ...todoItem,
            isDone: !todoItem.isDone,
          };
        }

        return todoItem;
      })
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        onSubmitTodo,
        onDeleteTodoItem,
        onToggleTodoItem,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;

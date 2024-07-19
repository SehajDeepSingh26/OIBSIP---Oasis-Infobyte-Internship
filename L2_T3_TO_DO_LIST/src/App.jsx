import { useEffect, useState } from "react";
import "./App.css";
import { ToDoProvider } from "./contexts";
import TodoForm from './components/TodoForm';
import TodoItem from "./components/TodoItem.jsx";

function App() {
    const [todos, setTodos] = useState([])

    const addTodo = (todo) => {
        setTodos((prev) => [{ ...todo }, ...prev])
    }

    const updateTodo = (id, todo) => {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
    }

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
    }

    const toggleComplete = (id) => {
        setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
    }

    useEffect(() => {
        const todoList = JSON.parse(localStorage.getItem("todos"))
        if (todoList && todoList.length > 0) {
            setTodos(todoList)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    return (
        <ToDoProvider value={{ todos, addTodo, toggleComplete, deleteTodo, updateTodo }}>
            <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 min-h-screen py-8 flex items-center justify-center">
                <div className="w-full max-w-2xl mx-auto bg-white bg-opacity-30 backdrop-blur-lg shadow-lg rounded-lg px-6 py-8">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        Manage Your Todos
                    </h1>
                    <div className="mb-6">
                        <TodoForm />
                    </div>
                    <div className="flex flex-col gap-y-4">
                        {todos.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} />
                        ))}
                    </div>
                </div>
            </div>
        </ToDoProvider>
    );
}

export default App;

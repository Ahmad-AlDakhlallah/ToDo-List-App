import { v4 as uuid } from "uuid"


export default function reducer(currentTodos, action) {
    switch (action.type) {
        case "add": {
            const newTodo = {
                id: uuid(),
                title: action.payload.title,
                details: "",
                isCompleted: false,
            }
            const updatedTodos = [...currentTodos, newTodo]
            localStorage.setItem("todos", JSON.stringify(updatedTodos))

            return updatedTodos
        }
        case "delete": {
            const updatedTodos = currentTodos.filter((t) => {
                return action.payload.id !== t.id

            })
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos
        }
        case "edit": {
            const updatedTodos = currentTodos.map((t) => {
                if (t.id == action.payload.id) {
                    return { ...t, title: action.payload.title, details: action.payload.details }
                } else {
                    return t
                }
            })
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos
        }
        case "get": {
            return JSON.parse(localStorage.getItem("todos")) ?? [];
        }

        case "toggledCompleted": {
            const updatedTodos = currentTodos.map((t) => {
                if (t.id == action.payload.id) {
                    // t.isCompleted = !t.isCompleted // Mutation
                    const updateTodo = {
                        ...t, isCompleted: !t.isCompleted
                    };
                    return updateTodo;
                }
                return t;
            })
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos

        }

        default: {
            throw Error("Unknown Action" + action.type)
        }
    }
}
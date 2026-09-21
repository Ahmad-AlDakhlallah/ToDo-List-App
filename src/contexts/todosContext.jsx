import { createContext, useContext, useReducer } from "react";
import todosReducer from '../reducers/todosReducer.jsx'

export const TodosContext = createContext([])
export const dispatchContext = createContext(null)

const TodosProvider = ({children}) => {
    const [todos, todosDispatch] = useReducer(todosReducer, [])
    return(
        <TodosContext.Provider value={{todos: todos, dispatch: todosDispatch}}>
            {children}
        </TodosContext.Provider>
    )
}

export const useTodos = () => {
    return useContext(TodosContext)
}

export default TodosProvider;
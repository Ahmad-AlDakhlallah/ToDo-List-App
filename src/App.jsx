import './App.css'
import ToDoList from './components/ToDoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './contexts/todosContext';
import { useState } from 'react';
import { ToastProvider } from './contexts/ToastContext';
import TodosProvider from './contexts/todosContext';

const theme = createTheme({
  typography: {
    fontFamily: ["font"],
  },
  palette: {
    primary: {
      main: "#0288d1"
    }
  }
});

function App() {
  const [todo, setTodo] = useState([])



  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>{/* اذا كان ال key وال value متشابهات من حيث الكتابة ما في داعي اكررها يعني بس بكتب اسمها */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#2f2f2f", height: "100vh",
            direction: "rtl"
          }}>
            {/* #191b1f */}
              <ToDoList />
            
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
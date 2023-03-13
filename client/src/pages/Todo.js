import React, { useState,useContext } from "react";
// import "./App.css";
// import "./Todo.css"
import  Axios  from "axios";
import { Grid,Typography } from "@mui/material";
import TodoForm from "../utils/TodoForm";
import TodoList from "../utils/TodoList";
import { ChangeDate , MyContext } from '../App';


const Todo = () => {


  
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [i,seti]=useState(0)


  const [startTime,setStartTime] = useState()
  const [endTime,setEndTime] = useState()


  const dateContext = useContext(ChangeDate)
  const authData = useContext(MyContext)
  const selectedDate = dateContext.selectedDate.localDate;
  const id = authData.data.id

    
    if(selectedDate){
        Axios.post('http://localhost:3001/getTask', {
            selectedDate,
            id,
        }).then((response) => {
    //   console.log(response.data);
      if(response.data){
          console.log(response.data.res);
          // setTodos(([{ }]));
          response.data.res.forEach(element => {
          seti(i+1)            
            console.log("els",i)
            
          const id = response.data.res[i].taskId
          console.log(id);
          // setTodo(response.data.res[i].todo)
          const task = response.data.res[i].todo
          setStartTime(response.data.res[i].start)
          setEndTime(response.data.res[i].end)
          setTodos([ {id, "todo":task , startTime , endTime},...todos]);
          setTodo("")
          });
          // console.log(todos)
      }      
    });
}
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id ? ({ id: t.id, todo }) :( { id: t.id, todo: t.todo })
      );
      // console.log(Todo);

      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }
 
    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo,startTime,endTime }, ...todos]);
      // console.log("todos",todos);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <Grid container spacing={2}>
    
      {/* <div> */}
      
      <Typography variant="h6" sx={{ mb: 1 }}>
        Add Task for today.</Typography>
      {/* <Grid item xs={12} sm={6} md={12} bgcolor='#EFEEEC'> */}
      <Grid item xs={12} sm={6} md={12} boxShadow={6} bgcolor='#ffffff'>

        <TodoForm
          handleSubmit={handleSubmit}
          todo={todo}
          editId={editId}
          setTodo={setTodo}

          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}

          todos={todos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          
        />
        </Grid>

        <TodoList
          todos={todos}
          setTodos={setTodos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      {/* </div> */}
      {/* </Grid> */}
    </Grid>
  );
};

export default Todo;
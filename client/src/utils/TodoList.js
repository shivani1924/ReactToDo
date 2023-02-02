import React,{useContext} from "react";
// import { TimePicker } from '@mui/x-date-pickers-pro/TimePicker';
// or
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { ChangeDate , MyContext } from '../App';


const TodoList = ({ todos, handleDelete, handleEdit}) => {
console.log("todos",todos)


  
  return (
    <ul className="allTodos">
      {todos.map((t) => (
        
        <li className="singleTodo">
          <span className="todoText" key={t.id}>
            {t.todo}
          </span>
          <span className="todoText">
            {new Date(t.startTime).toLocaleTimeString()}
          </span>
          <span className="todoText">
            {new Date(t.endTime).toLocaleTimeString()}
          </span>
          {/* <span className="todoText" key={t.id}>
            {t.startTime}
          </span> */}
          <>
          
          <button onClick={() => handleEdit(t.id)}>Edit</button>
          <button onClick={() => handleDelete(t.id)}>Delete</button>
          </>
          {/* hhvhv */}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

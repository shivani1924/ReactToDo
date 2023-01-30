import React, { useState } from "react";
// import { TimePicker } from '@mui/x-date-pickers-pro/TimePicker';

import TimeRange from 'react-time-range';
import moment from 'moment';
import { getTime } from "date-fns";
import Axios from "axios";

//----------------------------------------------------------------------------------------------------------------

const TodoForm = ({ handleSubmit, todo, editId, setTodo ,startTime, setStartTime, endTime, setEndTime}) => {
  
  const go = async() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    const userId = auth.result[0].idusers ;
    const date = new Date().toLocaleDateString();
    const id =  `${todo}-${Date.now()}`;
    console.log(id);
    // console.log(date)
    // console.log(startTime)
    // console.log(todo)

    await Axios.post('http://localhost:3001/task', {
      userId,
      todo,
      startTime,
      endTime,
      date,
      id
    }).then((response) => {
      alert('successful')    
    });
  }
  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <TimeRange
        startMoment={startTime}
        endMoment={endTime}
        onChange={({startTime,endTime}) => {
          setStartTime(startTime)
          setEndTime(endTime)
          console.log(startTime,endTime)
        }}
      />
      <button type="submit" onClick={go}> {editId ? "Edit" : "Go"}</button>

    </form>
  );
};

export default TodoForm;
import React, { useState } from "react";
// import { TimePicker } from '@mui/x-date-pickers-pro/TimePicker';

import TimeRange from 'react-time-range';
import moment from 'moment';
import { getTime } from "date-fns";
import Axios from "axios";
import '../pages/Todo.css'
// import { red } from "@mui/material/colors";
import { Grid,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ClockIn1 from "./ClockIn";

//----------------------------------------------------------------------------------------------------------------

const TodoForm = ({ handleSubmit, todo, editId, setTodo ,startTime, setStartTime, endTime, setEndTime,date,start,timer,properbreaktime,clockOut,isbreak,Resume,Break,ClockIn}) => {
  
  // const navigate = useNavigate();
  console.log(date);
  const go = async() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    const userId = auth.result[0].idusers ;
    const date = new Date().toLocaleDateString();
    const id =  `${todo}-${Date.now()}`;
    console.log(id);
    console.log(editId);
    await Axios.post('http://localhost:3001/task', {
      userId,
      todo,
      startTime,
      endTime,
      date,
      id
    }).then((response) => {
      console.log(response);
      alert('successful')    
    }).catch((error) => {
      const err = error.response.status;
      console.log(error);
      if(err===498){
        console.log("498");
      }
    })
  }
  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <Grid color='#D1E9FC' >
      {
      editId ? 
      <TimeRange
        startMoment={startTime}
        endMoment={endTime}
        onChange={({startTime,endTime}) => {
          setStartTime(startTime)
          setEndTime(endTime)
          console.log(startTime,endTime)
        }}
        // bgcolor='red'
        className='select'
        // id = 'select'        
        />
        :
        <ClockIn1
          date={date.toDateString()}
          start={start}
          timer={timer}
          properbreaktime={properbreaktime}
          clockOut={clockOut}
          isbreak={isbreak}
          Resume={Resume}
          Break={Break}
          ClockIn={ClockIn}            
        />
      }
      </Grid> 
      <Button type="submit" onClick={go}> {editId ? "Edit" : "Add"}</Button> 
    </form>
  );
};

export default TodoForm;
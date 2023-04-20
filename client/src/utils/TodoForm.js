import React, { useState } from 'react';

import TimeRange from 'react-time-range';
import moment from 'moment';
import { getTime } from 'date-fns';
import Axios from 'axios';
import '../pages/Todo.css';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClockIn1 from './ClockIn';

//----------------------------------------------------------------------------------------------------------------

const TodoForm = ({
  handleSubmit,
  todo,
  editId,
  setTodo,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  date,
  start,
  timer,
  properbreaktime,
  clockOut,
  isbreak,
  Resume,
  Break,
  ClockIn,
  clockInAvg,
  updateList,
}) => {
  const auth = JSON.parse(localStorage.getItem('user'));
  const userId = auth.result[0].idusers;
  const id = `${todo}-${Date.now()}`;

  const go = async () => {
    const date = new Date().toLocaleDateString();

    console.log(id);
    console.log(editId);

    const loggedTime = async () => {
      Axios.post('http://localhost:3001/loggedduration', {
        userId,
        date,
        clockInAvg,
      })
        .then((response) => {
          console.log(response);
          alert('successful');
        })
        .catch((error) => {
          const err = error.response.status;
          console.log(error);
          if (err === 498) {
            console.log('498');
          }
        });
    };

    await Axios.post('http://localhost:3001/task', {
      userId,
      todo,
      startTime,
      endTime,
      date,
      id,
      clockInAvg,
    })
      .then((response) => {
        console.log(response);
        alert('successful');

        loggedTime();
      })
      .catch((error) => {
        const err = error.response.status;
        console.log(error);
        if (err === 498) {
          console.log('498');
        }
      });
  };

  const editTask = async () => {
    await Axios.post('http://localhost:3001/editTask', {
      editId,
      userId,
      todo,
      startTime,
      endTime,
      date,
      id,
    })
      .then((response) => {
        console.log(response);
        updateList();
      })
      .catch((error) => {
        const err = error.response.status;
        console.log(error);
        if (err === 498) {
          console.log('498');
        }
      });
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
      <Grid item xs={12} sm={12} md={7}>
        {editId ? (
          <TimeRange
            startMoment={startTime}
            endMoment={endTime}
            onChange={({ startTime, endTime }) => {
              setStartTime(startTime);
              setEndTime(endTime);
              console.log(startTime, endTime);
            }}
            className="select"
          />
        ) : (
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
        )}
      </Grid>
      <Button type="submit" onClick={editId ? editTask : go}>
        {' '}
        {editId ? 'Edit' : 'Add'}
      </Button>
    </form>
  );
};

export default TodoForm;

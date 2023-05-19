import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, Snackbar } from '@mui/material';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import TimeRange from 'react-time-range';
import '../pages/Todo.css';
import ClockIn1 from './ClockIn';

// Functionality to add task with time.

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
  const [open, setOpen] = useState(false);

  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const Go = async () => {
    const date = new Date().toLocaleDateString();

    console.log(id);
    console.log(startTime);

    const loggedTime = async () => {
      Axios.post('http://localhost:3001/loggedduration', {
        userId,
        date,
        clockInAvg,
      })
        .then((response) => {
          console.log(response);
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
        setOpen(true);

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
    <>
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
        {todo ? (
          endTime ? (
            <Button type="submit" onClick={editId ? editTask : Go}>
              {' '}
              {editId ? 'Edit' : 'Add'}
            </Button>
          ) : (
            <Button type="submit" onClick={editId ? editTask : Go} disabled>
              {' '}
              {editId ? 'Edit' : 'Add'}
            </Button>
          )
        ) : (
          <Button type="submit" onClick={editId ? editTask : Go} disabled>
            {' '}
            {editId ? 'Edit' : 'Add'}
          </Button>
        )}

        <Snackbar
          open={open}
          autoHideDuration={10000}
          onClose={handleNotificationClose}
          message="Task is successfully added."
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleNotificationClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </form>
    </>
  );
};

export default TodoForm;

TodoForm.propTypes = {
  // Your other propTypes here
  updateList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  todo: PropTypes.string.isRequired,
  editId: PropTypes.number.isRequired,
  setTodo: PropTypes.func.isRequired,
  startTime: PropTypes.instanceOf(Date),
  setStartTime: PropTypes.func.isRequired,
  endTime: PropTypes.instanceOf(Date),
  setEndTime: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date),
  start: PropTypes.string,
  timer: PropTypes.array.isRequired,
  properbreaktime: PropTypes.array.isRequired,
  clockOut: PropTypes.func.isRequired,
  isbreak: PropTypes.number.isRequired,
  Resume: PropTypes.func.isRequired,
  Break: PropTypes.func.isRequired,
  ClockIn: PropTypes.func.isRequired,
  clockInAvg: PropTypes.number,
};

import { Grid, Typography } from '@mui/material';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ChangeDate, MyContext } from '../App';
import TodoForm from '../utils/TodoForm';
import TodoList from '../utils/TodoList';
import WeeklyChart from '../utils/WeeklyChart';

const TotalTimeCounter = () => {
  const startTimeString = localStorage.getItem('start');
  let diffHrs = 0;
  let diffMins = 0;
  let diffSecs = 0;
  if (startTimeString) {
    const currentTime = new Date(startTimeString);
    const startTime = new Date();
    const diffMs = Math.abs(startTime - currentTime) / 1000;
    diffHrs = Math.floor(diffMs / 3600) % 24;
    diffMins = Math.floor(diffMs / 60) % 60;
    diffSecs = Math.floor(diffMs % 60);
  }
  return (
    <>
      {diffHrs} :{diffMins} :{diffSecs}
      {startTimeString}
    </>
  );
};

const Todo = () => {
  
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const [clockInAvg, setClockInAvg] = useState();
  const [date, setDate] = useState(new Date());

  const [localDate, setLocalDate] = useState(new Date().toLocaleDateString());

  const dateContext = useContext(ChangeDate);
  const authData = useContext(MyContext);

  const selectedDate = dateContext.selectedDate.localDate;
  const auth = JSON.parse(localStorage.getItem('user'));
  const id = auth.result[0].idusers;
  const firstname = authData.data.name;
  const updateList = () => {
    console.log(id);
    axios
      .post('http://localhost:3001/getTask', {
        localDate,
        id,
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data.res);
          let data = [];
          response.data.res.forEach(({ taskId, todo, start, end }) => {
            data = [{ id: taskId, todo, startTime: start, endTime: end }, ...data];
            setTodo('');
          });
          setTodos(data);
        }
      });
  };

  const getSelectedData = () => {
    axios
      .post('http://localhost:3001/getTask', {
        localDate: selectedDate,
        id,
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data.res);
          if (response.data) {
            console.log(response.data.res);
            let data = [];
            response.data.res.forEach(({ taskId, todo, start, end }) => {
              data = [{ id: taskId, todo, startTime: start, endTime: end }, ...data];
              setTodo('');
            });
            setTodos(data);
          }
          console.log(todos);
        }
      });

    axios
      .post('http://localhost:3001/selectedDate', {
        selectedDate,
        id,
      })
      .then((response) => {
        if (response.data) {
          const localselectedDate = response.data.clockin[0];
          localStorage.setItem('selectedDate', localselectedDate);
          setDate(dateContext.selectedDate.date);
          setStart(new Date(response.data.clockin[0].clockInTime));
          const temp = calTime(response.data.clockin[0].clockInAvg);
          setTimer(temp);
          setbreakduration(response.data.clockin[0].break);
          console.log(localselectedDate);
          calTime(breakduration);
          sets(calTime(breakduration));
        }
      });
  };

  useEffect(() => {
    if (selectedDate) {
      setLocalDate(selectedDate);
      getSelectedData();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) => (t.id === editTodo.id ? { id: t.id, todo } : { id: t.id, todo: t.todo }));

      setTodos(updatedTodos);
      setEditId(0);
      setTodo('');
      return;
    }

    if (todo !== '') {
      setTodos([{ id: `${todo}-${Date.now()}`, todo, startTime, endTime }, ...todos]);

      setTodo('');
    }
  };

  const handleDelete = (taskId) => {
    const delTodo = todos.filter((to) => to.taskId !== taskId);

    axios
      .post('http://localhost:3001/deletetask', {
        localDate,
        taskId,
        id,
      })
      .then((response) => {
        if (response) {
          console.log(response.data.res);

          setTodos([...delTodo]);
          updateList();
        }
      });
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    console.log(editTodo);
    setTodo(editTodo.todo);
    setEditId(id);
    setStartTime(editTodo.startTime);
    setEndTime(editTodo.endTime);
    console.log(Date(editTodo.startTime).toLocalTimeString);
  };

  const [start, setStart] = useState(localStorage.getItem('start') ? new Date(localStorage.getItem('start')) : null);
  const [startTimeString, setstartTimeString] = useState('');
  const [timer, setTimer] = useState([0, 0, 0]);
  const [status, setStatus] = useState();

  function calTime(diffMs) {
    let diffHrs = 0;
    let diffMins = 0;
    let diffSecs = 0;
    diffHrs = Math.floor(diffMs / 3600) % 24;
    diffMins = Math.floor(diffMs / 60) % 60;
    diffSecs = Math.floor(diffMs % 60);
    return [diffHrs, diffMins, diffSecs];
  }
  function a() {
    setstartTimeString(localStorage.getItem('start'));
    let diffHrs = 0;
    let diffMins = 0;
    let diffSecs = 0;
    if (startTimeString) {
      const currentTime = new Date(startTimeString);
      const startTime = new Date();
      const diffMs = Math.abs(startTime - currentTime) / 1000;
      localStorage.setItem('loggedDuration', diffMs);
      diffHrs = Math.floor(diffMs / 3600) % 24;
      diffMins = Math.floor(diffMs / 60) % 60;
      diffSecs = Math.floor(diffMs % 60);
    }
    return [diffHrs, diffMins, diffSecs];
  }

  const [breakduration, setbreakduration] = useState(0);
  const ClockIn = async () => {
    const clockInTime = new Date();

    const auth = JSON.parse(localStorage.getItem('user'));
    const id = auth.result[0].idusers;
    const loggedDuration = 0;
    setbreakduration('0');
    setStatus(1);
    setStartTime(clockInTime);
    console.log('           ');
    console.log(clockInTime);
    console.log(startTime);

    await axios
      .post('http://localhost:3001/logged', {
        id,
        status,
        clockInTime,
        loggedDuration,
        breakduration,
        localDate,
      })
      .then(() => {
        // alert('successful');
        setStart(new Date());
        localStorage.setItem('start', new Date());
        setInterval(TotalTimeCounter, 10000);
      })
      .catch((error) => alert(error.message));
  };

  const clockOut = async () => {
    setStatus(0);
    const clockOutTime = new Date();
    setEndTime(clockOutTime);
    const duration = localStorage.getItem('loggedDuration');
    console.log(duration);
    const localStorageBreak = localStorage.getItem('breakduration');
    setbreakduration(localStorageBreak);
    const loggedDuration = duration - breakduration;
    setClockInAvg(loggedDuration);
    console.log(breakduration);
    console.log('logged', clockInAvg);
    localStorage.removeItem('start');
    localStorage.removeItem('break');
    localStorage.removeItem('breakduration');
    localStorage.removeItem('loggedDuration');

    setStart(localStorage.getItem('start'));
    const auth = JSON.parse(localStorage.getItem('user'));
    const id = auth.result[0].idusers;
    const clockInTime = startTime;
    const localDate = date.toLocaleDateString();
    console.log(status);

    await axios
      .post('http://localhost:3001/clockout', {
        id,
        status,
        clockInTime,
        loggedDuration,
        breakduration,
        localDate,
        clockOutTime,
      })
      .then(() => {
        // alert('successful');
      });
  };
  const [isbreak, setisbreak] = useState(0);
  const [breaktime, setbreaktime] = useState(new Date());
  const Break = () => {
    localStorage.setItem('break', new Date());
    setisbreak(1);
    setbreaktime(new Date());
    setInterval(TotalTimeCounter, 10000);
  };
  const Resume = async () => {
    const previousBreak = localStorage.getItem('breakduration');
    const totalbreaktime = Math.abs(new Date() - breaktime) / 1000;
    localStorage.setItem(
      'breakduration',
      previousBreak != null ? parseInt(previousBreak, 10) + parseInt(totalbreaktime, 10) : totalbreaktime
    );
    setisbreak(0);
    setbreakduration(localStorage.getItem('breakduration'));
    calTime(previousBreak);
    setisbreak(0);
    sets(calTime(localStorage.getItem('breakduration')));

    const auth = JSON.parse(localStorage.getItem('user'));
    const id = auth.result[0].idusers;
    const localDate = date.toLocaleDateString();

    await axios
      .post('http://localhost:3001/resume', {
        id,
        breakduration,
        localDate,
      })
      .then(() => {
        // alert('successful');
      });
  };
  const [s, sets] = useState(calTime(localStorage.getItem('breakduration')));
  const properbreaktime = s;
  useEffect(() => {
    const interval = setInterval(() => {
      const temp = a();
      setTimer(temp);
    }, [1000]);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    setTimeout(updateList, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2} sm={2} md={5} xl>
          <WeeklyChart firstname={firstname} userId={id} />
        </Grid>
        <Grid item xs={1} sm={2} md={7}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Add Task for today.
          </Typography>
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
            date={date}
            start={start}
            timer={timer}
            properbreaktime={properbreaktime}
            clockOut={clockOut}
            isbreak={isbreak}
            Resume={Resume}
            Break={Break}
            ClockIn={ClockIn}
            clockInAvg={clockInAvg}
            updateList={updateList}
          />
        </Grid>
      </Grid>
      <TodoList todos={todos} setTodos={setTodos} handleEdit={handleEdit} handleDelete={handleDelete} />
    </>
  );
};

export default Todo;

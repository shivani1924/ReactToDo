import React, { useState,useContext,useEffect } from "react";
// import "./App.css";
// import "./Todo.css"
import  Axios  from "axios";
import { Grid,Typography } from "@mui/material";
import TodoForm from "../utils/TodoForm";
import TodoList from "../utils/TodoList";
import { ChangeDate , MyContext } from '../App';
import {
  AppWebsiteVisits,
} from '../sections/@dashboard/app';



const TotalTimeCounter = () => {
  const startTimeString = localStorage.getItem('start');    
  let diffHrs = 0;
  let diffMins = 0;
  let diffSecs = 0;
  if(startTimeString){
      const currentTime = new Date(startTimeString);
      const startTime = new Date();
      const diffMs = Math.abs(startTime-currentTime) / 1000;
          diffHrs = Math.floor(diffMs / 3600) % 24;
          diffMins = Math.floor(diffMs / 60) % 60;
          diffSecs = Math.floor(diffMs % 60);
      }
  return (
      <>
      {diffHrs} :
      {diffMins} :
      {diffSecs}
      {startTimeString}
      </>
  );
}

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
  const firstname = authData.data.name
// console.log(authData);
    
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
          console.log(todos)
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
      // setTodos([ {id, "todo":task , startTime , endTime},...todos]);

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
    setStartTime(editTodo.startTime);
    setEndTime(editTodo.endTime);
    console.log(Date(editTodo.startTime).toLocalTimeString);
  };

    const [date,setDate] = useState (new Date());
    const [start,setStart] = useState(localStorage.getItem('start')?new Date(localStorage.getItem('start')):null);
    const [startTimeString , setstartTimeString] = useState("")
    const [timer,setTimer] = useState([0,0,0]);
    const [status,setStatus] = useState()
    const localDate = date.toLocaleDateString();
    
    if(selectedDate){
        Axios.post('http://localhost:3001/selectedDate', {
            selectedDate,
            id,
        }).then((response) => {
          
          if(response.data){
            //   console.log(response.data.clockin.break);
            const localselectedDate = response.data.clockin[0]
            localStorage.setItem("selectedDate",localselectedDate)
                setDate(dateContext.selectedDate.date);
                setStart(new Date(response.data.clockin[0].clockInTime))
                const temp = calTime(response.data.clockin[0].clockInAvg)
                setTimer(temp)
                setbreakduration(response.data.clockin[0].break);
                console.log(localselectedDate);
                calTime(breakduration);
                sets(calTime(breakduration))
          }      
        });
      }
    function calTime(diffMs){
        let diffHrs = 0;
        let diffMins = 0;
        let diffSecs = 0;
        diffHrs = Math.floor(diffMs / 3600) % 24;
        diffMins = Math.floor(diffMs / 60) % 60;
        diffSecs = Math.floor(diffMs % 60);
        return [diffHrs,diffMins,diffSecs];
    }
    function a(){
        setstartTimeString(localStorage.getItem('start'));
        let diffHrs = 0;
        let diffMins = 0;
        let diffSecs = 0;
        if(startTimeString){
            const currentTime = new Date(startTimeString);
            const startTime = new Date();            
            const diffMs = Math.abs(startTime-currentTime) / 1000;
            localStorage.setItem("loggedDuration", diffMs);
            diffHrs = Math.floor(diffMs / 3600) % 24;
            diffMins = Math.floor(diffMs / 60) % 60;
            diffSecs = Math.floor(diffMs % 60);
        }
        return [diffHrs,diffMins,diffSecs];    
    }
    
    const [breakduration , setbreakduration] = useState(0)
    const ClockIn = async() => {
        
        const auth = JSON.parse(localStorage.getItem("user"));       
        const id = auth.result[0].idusers ;
        const clockInTime = new Date();
        const loggedDuration = 0;
        // console.log(clockInTime);
        setbreakduration("0");
        setStatus(1)
        setStartTime(clockInTime);

        await Axios.post('http://localhost:3001/logged', {
            id,
            status,
            clockInTime,
            loggedDuration,
            breakduration,
            localDate
        }).then((response) => {
            alert('successful')
            setStart(new Date());
            localStorage.setItem('start', new Date());
            setInterval(TotalTimeCounter, 10000);
    }
        ).catch((error) => alert(error.message))
    }


    const clockOut = async() =>{
        setStatus(0)
        const clockOutTime = new Date();
        setEndTime(clockOutTime)
        const duration = localStorage.getItem('loggedDuration')
        console.log(duration);
        const localStorageBreak = localStorage.getItem('breakduration')
        setbreakduration(localStorageBreak);
        const loggedDuration = duration - breakduration
        console.log(breakduration)
        console.log("logged",loggedDuration);
        localStorage.removeItem('start');
        localStorage.removeItem('break');
        localStorage.removeItem('breakduration');
        localStorage.removeItem('loggedDuration');

        setStart(localStorage.getItem('start'));
        const auth = JSON.parse(localStorage.getItem("user"));       
        const id = auth.result[0].idusers ;
        const clockInTime = start;
        const localDate = date.toLocaleDateString();
        console.log(status);
        // setStatus(0)

      await Axios.post('http://localhost:3001/clockout', {
      id,
      status,
      clockInTime,
      loggedDuration,
      breakduration,
      localDate
    }).then((response) => {
      alert('successful')
    });
    }
    const [isbreak,setisbreak] = useState(0);
    const [breaktime, setbreaktime] = useState(new Date());
    const Break = () => {
        localStorage.setItem('break', new Date());
        setisbreak(1);
        setbreaktime(new Date());
        setInterval(TotalTimeCounter, 10000);
    }
    const Resume =async()=> {
        const previousBreak = localStorage.getItem("breakduration") ;
        const totalbreaktime = Math.abs(new Date() - breaktime) / 1000;
        localStorage.setItem('breakduration',  previousBreak != null ? parseInt(previousBreak,10)+ parseInt( totalbreaktime,10 ) : totalbreaktime )
        setisbreak(0);
        setbreakduration(localStorage.getItem('breakduration'))
        calTime(previousBreak);
        setisbreak(0)
        sets(calTime(localStorage.getItem('breakduration')))


        const auth = JSON.parse(localStorage.getItem("user"));       
        const id = auth.result[0].idusers ;
        // const clockInTime = start;
        const localDate = date.toLocaleDateString();

      await Axios.post('http://localhost:3001/resume', {
      id,
    //   clockInTime,
    //   loggedDuration,
      breakduration,
      localDate
    }).then((response) => {
      alert('successful')
    });        
    }
    const [s,sets] =useState(calTime(localStorage.getItem('breakduration')))
    const properbreaktime = s;
    useEffect(()=>{
        const interval = setInterval(() => {
            const temp = a();
            setTimer(temp);
        },[1000]);
        return()=> clearInterval(interval);
    });


  // const dateContext = useContext(ChangeDate)
  //   const authData = useContext(MyContext)
  //   const selectedDate = dateContext.selectedDate.localDate;
  //   const id = authData.data.id
   

  return (
    <>
    <Grid container spacing={2}>
    
      {/* <div> */}
      
      {/* <Grid item xs={12} sm={6} md={12} bgcolor='#EFEEEC'> */}
      <Grid item xs={2} sm={2} md={3} xl>
            {/* <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} /> */}
            <AppWebsiteVisits
              title="Total Working Hours"
              // subheader="(+43%) than last year"
              chartLabels={[
                '04/10/2023',
                '04/11/2023',
                '04/12/2023',
                '04/13/2023',
                '04/14/2023',
              ]}
              chartData={[
                {
                  name: firstname,
                  type: 'column',
                  fill: 'solid',
                  data: [4, 7, 8, 8, 0],
                },
                // {
                  //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                // {
                  //   name: 'Team C',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ]}
            />
          </Grid>
          <Grid item xs={1} sm={2} md={9} >

            <Typography variant="h6" sx={{ mb: 1 }}>
              Add Task for today.</Typography>
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
              
            />
          </Grid>
          </Grid>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          />
      {/* </div> */}
      {/* </Grid> */}
    </>
  );
};

export default Todo;
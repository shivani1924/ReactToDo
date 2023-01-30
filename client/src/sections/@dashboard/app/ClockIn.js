import {useState,useEffect, useContext} from 'react';
import Axios from 'axios';
import { ChangeDate , MyContext } from '../../../App';


//-----------------------------------------------------------------------------------------------------------------


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


function ClockIn1(){   

    const dateContext = useContext(ChangeDate)
    const authData = useContext(MyContext)
    const selectedDate = dateContext.selectedDate.localDate;
    const id = authData.data.id
    const [date,setDate] = useState (new Date());
    const [start,setStart] = useState(localStorage.getItem('start')?new Date(localStorage.getItem('start')):null);
    const [startTimeString , setstartTimeString] = useState("")
    const [timer,setTimer] = useState([0,0,0]);

    
    if(selectedDate){
        Axios.post('http://localhost:3001/selectedDate', {
            selectedDate,
            id,
        }).then((response) => {
    //   console.log(response.data);
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
        const localDate = date.toLocaleDateString();



        await Axios.post('http://localhost:3001/logged', {
            id,
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

        const duration = localStorage.getItem('loggedDuration')
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
        // console.log(logg);

      await Axios.post('http://localhost:3001/clockout', {
      id,
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
        const clockInTime = start;
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
        },1000);
        return()=> clearInterval(interval);
    });
    return (
       <div className='FullScreen'>
            <div className='clockInOverview'>
                <div className='clockInTime'>
                    {date?.toDateString()}
                </div>
                <div>
                {
                    start != null
                    ?
                    <div className='clockInFont'>
                        <>
                        { timer[0] >= 10 ? timer[0] : 0 + timer[0]} :
                        { timer[1] >= 10 ? timer[1] : 0 + timer[1]} : 
                        { timer[2] >= 10 ? timer[2] : 0 + timer[2]}
                        </>

                            <div className='description'>
                                <div className='clockTime'>
                                        <h5>Clock In Time</h5>
                                        <h6>{start?.toLocaleTimeString()}</h6>
                                </div>
                                <div className='clockTime'>
                                        <h5>Break Duration</h5>
                                        <h6>{properbreaktime[0]}:{properbreaktime[1]}:{properbreaktime[2]}</h6>
                                </div>        
                            </div>

                        <>
                        
                            <> 
                                <div className='clockInButton'>
                                    <button onClick={clockOut}>
                                        Clock Out
                                    </button>
                            <>
                            {
                               isbreak === 1 ? 
                               <>
                                    <button onClick={Resume}>
                                        Resume
                                    </button> 
                               </>
                               :
                               <>
                                    <button onClick={Break}>
                                        Break
                                    </button>
                               </>                               
                            }
                                
                            </>
                        </div>
                        </>
                        
                    
                    </>
                    </div>
                    : 
                    <div className='clockInFont'>
                        00:00:00
                        <div className='clockInButton'>
                            <button onClick={ClockIn}>Clock In</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div> 
);
}

export default ClockIn1;
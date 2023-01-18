import {useState,useEffect} from 'react';
import Axios from 'axios';


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
        const startTimeString = localStorage.getItem('start');
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

    const[start,setStart] = useState(localStorage.getItem('start')?new Date(localStorage.getItem('start')):null);
    const loginTime = new Date(start).toDateString();
    
    const[timer,setTimer] = useState([0,0,0]);
    const date = new Date();
    const ClockIn = () => {
        setStart(new Date());
        localStorage.setItem('start', new Date());
        setInterval(TotalTimeCounter, 10000);
        // console.log();
        
    }
    const [breakduration , setbreakduration] = useState(0)
    const clockOut = async() =>{
        const duration = localStorage.getItem('loggedDuration')
        // const breakduration = 
        setbreakduration(localStorage.getItem('breakduration'));
        const loggedDuration = duration - breakduration
        console.log(loggedDuration);
        localStorage.setItem('loggedtime',loggedDuration)
        localStorage.removeItem('start');
        localStorage.removeItem('break');
        localStorage.removeItem('breakduration');
        setStart(localStorage.getItem('start'));
        console.log(start?.toLocaleTimeString());
        const auth = JSON.parse(localStorage.getItem("user"));
        console.log(auth);
    // if(auth) {
        // const token = auth.result.idusers ;
        // const token = "123" ;
        
        const id = auth.result[0].idusers ;
        const clockInTime = start?.toLocaleTimeString();
        console.log(id)
        // const email = auth.result[0].email ;
    // }

      await Axios.post('http://localhost:3001/logged', {
      id,
    //   name,
      clockInTime,
      loggedDuration,
      breakduration,
      date
    }).then((response) => {
      alert('successful')
      // console.log(response.data.auth);
    //   console.log(response.data);
    //   localStorage.setItem("user" , JSON.stringify(response.data));

    //   navigate('/dashboard', { replace: true });
      
    });
    }
    const [isbreak,setisbreak] = useState(0);
    const [breaktime, setbreaktime] = useState(new Date());
    const Break = () => {
        localStorage.setItem('break', new Date());
        setisbreak(1);
        setbreaktime(new Date());
    }
    const Resume =()=> {
        const previousBreak = localStorage.getItem("breakduration") ;
        const totalbreaktime = Math.abs(new Date() - breaktime) / 1000;
        localStorage.setItem('breakduration',  previousBreak != null ? parseInt(previousBreak,10)+ parseInt( totalbreaktime,10 ) : totalbreaktime )
        setisbreak(0);
        calTime(previousBreak);
        setisbreak(0)
    }
    const properbreaktime = calTime(localStorage.getItem('breakduration'))
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
                        <div className='clockInButton'>
                            <button onClick={clockOut}>Clock Out</button>
                            <>
                            {
                               isbreak === 1 ? <><button onClick={Resume}>Resume</button> </>
                               :
                               <>
                                    <button onClick={Break}>Break</button>
                                </>
                            }
                                
                            </>
                        </div>
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
            {/* <div>
            </div> */}
       </div> 
    );
}

export default ClockIn1;
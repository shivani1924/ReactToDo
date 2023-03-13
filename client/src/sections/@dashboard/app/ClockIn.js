import {useState,useEffect, useContext} from 'react';
import Axios from 'axios';
import { Button,Typography,Grid ,Box,item} from '@mui/material';
import { ChangeDate , MyContext  } from '../../../App';
import {
    AppWidgetSummary
  } from '.'
//   '../../sections/@dashboard/app';
// import Typography from '@mui/material';


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
    const [status,setStatus] = useState()
    const localDate = date.toLocaleDateString();

    // Axios.post('http://localhost:3001/loggedstatus' , {
    //       id,
    //       localDate,
    //       }).then((response) =>{
    //         if(response.data.res[0].status === 0){

    //             console.log(response.data.res[0].clockInTime);
    //             localStorage.setItem('start',response.data.res[0].clockInTime)
    //             // setStart((response.data.res[0].clockInTime))
    //         }
    //         // setStart(response.)
    //       })
    
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
        setStatus(1)

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
    return (
    //    <div className='FullScreen'>
    //         <div className='clockInOverview'>
    //             <div className='clockInTime'>
    //                 {date?.toDateString()}
    //             </div>
    //             <div>
    //             {
    //                 start != null
    //                 ?
    //                 <div>
    //                     <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    
    //                     { timer[0] >= 10 ? timer[0] : 0 + timer[0]} :
    //                     { timer[1] >= 10 ? timer[1] : 0 + timer[1]} : 
    //                     { timer[2] >= 10 ? timer[2] : 0 + timer[2]}
    //                     </Typography>

    //                         <div>
    //                             <Grid item xs={6} sm={6} md={3}>

    //                                     <h5>Clock In Time</h5>
    //                                     <h6>{start?.toLocaleTimeString()}</h6>

    //                             </Grid>
    //                             <div className='clockTime'>
    //                                     <h5>Break Duration</h5>
    //                                     <h6>{properbreaktime[0]}:{properbreaktime[1]}:{properbreaktime[2]}</h6>
    //                             </div>        
    //                         </div>

    //                     <>
                        
    //                         <> 
    //                             <div className='clockInButton'>
    //                                 <Button variant='contained' onClick={clockOut}>
    //                                     Clock Out
    //                                 </Button>
    //                         <>
    //                         {
    //                            isbreak === 1 ? 
    //                            <>
    //                                 <Button variant='contained' onClick={Resume}>
    //                                     Resume
    //                                 </Button> 
    //                            </>
    //                            :
    //                            <>
    //                                 <Button variant='contained' onClick={Break}>
    //                                     Break
    //                                 </Button>
    //                            </>                               
    //                         }
                                
    //                         </>
    //                     </div>
    //                     </>
                        
                    
    //                 </>
    //                 </div>
    //                 : 
    //                 <div className='clockInFont'>
    //                     00:00:00
    //                     <div className='clockInButton'>
    //                         <Button variant='contained' onClick={ClockIn}>Clock In</Button>
    //                     </div>
    //                 </div>
    //             }

    //         </div>
    //     </div>
    // </div> 
        <Grid container spacing={2} textAlign={'center'}>
            <Grid item xs={12} sm={6} md={12} fontFamily={'Trebuchet MS'} fontSize={22}>
                    {date?.toDateString()}     
            </Grid>
            <Grid item xs={12} sm={6} md={12} fontFamily={'Trebuchet MS'} fontSize={22}>
            {
                    start != null
                    ?
                    <Grid item xs={12} sm={6} md={12} bgcolor='#D1E9FC' fontFamily={'Trebuchet MS'} fontSize={22}>
                        <Typography variant="subtitle10" sx={{ color: 'text.primary' }}>
                        { timer[0] >= 10 ? timer[0] : 0 + timer[0]} :
                        { timer[1] >= 10 ? timer[1] : 0 + timer[1]} : 
                        { timer[2] >= 10 ? timer[2] : 0 + timer[2]}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                        <Grid container rowSpacing={1}  bgcolor='#D1E9FC' fontFamily={'Trebuchet MS'} fontSize={22}>
                                <Grid item xs={6} textAlign={'center'}>
                                    <item>
                                        <h5>Clock In Time</h5>
                                        <h6>{start?.toLocaleTimeString()}</h6>
                                    </item>
                                </Grid>
                                <Grid item xs={6} textAlign={'center'}>
                                        <h5>Break Duration</h5>
                                        <h6>{properbreaktime[0]}:{properbreaktime[1]}:{properbreaktime[2]}</h6>
                                </Grid>        
                            </Grid>
                            </Box>
                        <>
                            <> 
                                <Grid textAlign={'center'}  item xs={12} sm={6} md={12} bgcolor='#D1E9FC' fontFamily={'Trebuchet MS'} fontSize={22}>
                                
                                    <Button variant='contained' onClick={clockOut}>
                                        Clock Out
                                    </Button>
                                    <>
                                    {
                                    isbreak === 1 ? 
                                    <>
                                            <Button variant='contained' onClick={Resume}>
                                                Resume
                                            </Button> 
                                    </>
                                    :
                                    <>
                                            <Button variant='contained' onClick={Break}>
                                                Break
                                            </Button>
                                    </>                               
                                    }                                
                                    </>
                                </Grid>
                            </>
                        </>
                    </Grid>
                    : 
                    <Grid item xs={12} sm={6} md={12} bgcolor='#D1E9FC' fontFamily={'Trebuchet MS'} fontSize={22}>

                        00:00:00
                        <Grid item xs={12} sm={6} md={12} bgcolor='#D1E9FC' fontFamily={'Trebuchet MS'} fontSize={22}>

                            <Button variant='contained' onClick={ClockIn}>Clock In</Button>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Grid>

);


}

export default ClockIn1;
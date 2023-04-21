import {useState,useEffect, useContext} from 'react';
import Axios from 'axios';
import { Button,Typography,Grid ,Box,item} from '@mui/material';


//-----------------------------------------------------------------------------------------------------------------




const ClockIn1=({date,start,timer,properbreaktime,clockOut,isbreak,Resume,Break,ClockIn})=>{   

    return (
   
        <Grid container spacing={2} textAlign={'center'}>
            
            <Grid item xs={12} sm={6} md={12} fontFamily={'Trebuchet MS'} fontSize={22}>
            {
                    start != null
                    ?
                    <Grid item xs={12} sm={6} md={12} bgcolor='#D1E9FC' fontFamily={'Trebuchet MS'} fontSize={22}>
                        {/* <Typography variant="subtitle10"> */}
                        { timer[0] >= 10 ? timer[0] : 0 + timer[0]} :
                        { timer[1] >= 10 ? timer[1] : 0 + timer[1]} : 
                        { timer[2] >= 10 ? timer[2] : 0 + timer[2]}
                        {/* </Typography> */}
                        {/* <Box sx={{ flexGrow: 1 }}>
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
                            </Box> */}
                        <>
                            <> 
                                <Grid textAlign={'center'}  item xs={12} sm={6} md={12} bgcolor='#D1E9FC' fontFamily={'Trebuchet MS'} fontSize={22}>
                                
                                    <Button variant='contained' onClick={clockOut}>
                                        Stop
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

                            <Button variant='contained' onClick={ClockIn}>Start</Button>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Grid>
      

);


}

export default ClockIn1;
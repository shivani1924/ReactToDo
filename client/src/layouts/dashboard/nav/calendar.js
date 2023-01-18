import {useState} from 'react';
import {Calendar} from 'react-calendar'; 
import './calendar.css';

function Cal() {
 const [date, setDate] = useState(new Date())
 const clickDate = () => {
  setDate(date);
  console.log(date);
 }


return (
 <div className="app">
   {/* <h1 className="header">React Calendar</h1> */}
   <div className="calendar-container">
     <Calendar onChange={clickDate} value={date}/>
   </div>
   <div className="text-center">
      Selected date: {date.toDateString()}
   </div>
 </div>
  )

}

export default Cal;
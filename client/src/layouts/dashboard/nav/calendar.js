import {useState,useContext} from 'react';
import {Calendar} from 'react-calendar'; 
import './calendar.css';
import { ChangeDate } from '../../../App';

function Cal() {
 const [date, setDate] = useState(new Date())
 const selectedDate = useContext(ChangeDate)

const a = (date) => {
  setDate(date);
 selectedDate.dispatchDate({type:"CHANGE_AUTH_DATA",payload:{date}})
}


return (
 <div className="app">
   {/* <h1 className="header">React Calendar</h1> */}
   <div className="calendar-container">
     <Calendar onChange={a} value={date}/>
   </div>
   <div className="text-center">
      Selected date: {date.toDateString()}
   </div>
 </div>
  )

}

export default Cal;
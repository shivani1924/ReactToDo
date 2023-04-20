import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import { AppWebsiteVisits } from '../sections/@dashboard/app';

function calTime(diffMs) {
  let diffHrs = 0;
  let diffMins = 0;
  let diffSecs = 0;
  diffHrs = Math.floor(diffMs / 3600) % 24;
  diffMins = Math.floor(diffMs / 60) % 60;
  diffSecs = Math.floor(diffMs % 60);
  return `${diffHrs}:${diffMins}`;
}
const WeeklyChart = ({ firstname, userId }) => {
  const [duration, setDuration] = useState([]);
  const [weekDates, setWeekDates] = useState([]);
  const chartData = () => {
    Axios.post('http://localhost:3001/getDashboardWeeklyChartData', {
      userId,
    })
      .then((response) => {
        const tempDate = [];
        const tempDuration = [];
        let tempDura = [];
        response.data.forEach((element) => {
          tempDate.push(element.date);
          if (element.duration) {
            tempDuration.push(element.duration);
          } else {
            tempDura.push('0:0');
          }
        });
        const x = tempDuration.map((val) => calTime(parseFloat(val)));
        tempDura = [...tempDura, ...x];
        setWeekDates(tempDate);
        setDuration(tempDura);
      })
      .catch((error) => {
        const err = error.response.status;
        console.log(error);
        if (err === 498) {
          console.log('498');
        }
      });
  };

  useEffect(() => {
    setTimeout(chartData, 1000);
  }, []);

  return (
    <AppWebsiteVisits
      title="Total Working Hours"
      chartLabels={weekDates}
      chartData={[
        {
          name: firstname,
          type: 'column',
          fill: 'solid',
          data: duration,
        },
      ]}
    />
  );
};

export default WeeklyChart;

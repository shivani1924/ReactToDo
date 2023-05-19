import Axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { AppWebsiteVisits } from '../sections/@dashboard/app';


function calTime(diffMs) {
  let diffHrs = 0;
  let diffMins = 0;
  diffHrs = Math.floor(diffMs / 3600) % 24;
  diffMins = Math.floor(diffMs / 60) % 60;
  return `${diffHrs}.${diffMins}`;
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
        tempDura = [...x, ...tempDura];
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

WeeklyChart.propTypes = {
  // Your other propTypes here
  userId: PropTypes.number,
  firstname: PropTypes.string.isRequired,
};

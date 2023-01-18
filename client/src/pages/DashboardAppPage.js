import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import ClockIn1 from '../sections/@dashboard/app/ClockIn';
import Iconify from '../components/iconify';
import { MyContext } from '../App'

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import Todo from './Todo';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  

  return (
    <>
      <Helmet>
        <title> Dashboard | First Touch </title>
      </Helmet>

      <Container maxWidth="xl">
        
          <MyContext.Consumer>
                  {
                    (data) => {
                      return(
                        
                        <Typography variant="h4" sx={{ mb: 5 }}>
                          Hi &nbsp;
                          {data.data.name}
                          ,Welcome back
                        </Typography>
                      )
                    }
                  }
          </MyContext.Consumer> 

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={12} bgcolor='#D1E9FC'>
    
            <ClockIn1/>
            {/* <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} /> */}
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

          <Grid item xs={12} md={6} lg={12}>
            {/* <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            /> */}


            <Todo/>
          </Grid> 
        </Grid>
      </Container>
    </>
  );
}

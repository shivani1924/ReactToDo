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
                        
                        <Typography variant="h4" sx={{ mb: 5 }} fontFamily="sans-serif">
                          Hi &nbsp;
                          {data.data.name}
                          ,Welcome back
                        </Typography>
                      )
                    }
                  }
          </MyContext.Consumer> 

        <Grid container spacing={1}>
          
          <Grid item xs={1} sm={2} md={4}>
            {/* <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} /> */}
            <AppWebsiteVisits
              title="Total Working Hours"
              // subheader="(+43%) than last year"
              chartLabels={[
                '02/27/2023',
                '02/28/2023',
                '03/01/2023',
                '03/02/2023',
                '03/03/2023',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13],
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
          <Grid item xs={6} sm={6} md={8} fontFamily={'Trebuchet MS'} fontSize={22} border={0.5} borderRadius={3} boxShadow={1}>
    
            <ClockIn1/>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

          <Grid item xs={12} md={6} lg={12}>
            


            <Todo/>
          </Grid> 
        </Grid>
      </Container>
    </>
  );
}

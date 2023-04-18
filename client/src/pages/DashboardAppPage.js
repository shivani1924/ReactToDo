import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import ClockIn1 from '../utils/ClockIn';
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
import TodoForm from '../utils/TodoForm';
import TodoList from '../utils/TodoList';

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
          <Grid item xs={12} sm={12} md={12} fontFamily={'Trebuchet MS'} fontSize={22} >    
            <Todo/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

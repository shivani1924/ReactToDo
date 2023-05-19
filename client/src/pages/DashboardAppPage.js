import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Grid, Typography } from '@mui/material';
// components
import { MyContext } from '../App';

import Todo from './Todo';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | First Touch </title>
      </Helmet>

      <Container maxWidth="xl">
        <MyContext.Consumer>
          {
            // eslint-disable-next-line arrow-body-style
            (data) => {
              return (
                <Typography variant="h4" sx={{ mb: 5 }} fontFamily="sans-serif">
                  Hi &nbsp;
                  {data.data.name}
                  ,Welcome back
                </Typography>
              );
            }
          }
        </MyContext.Consumer>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} fontFamily={'Trebuchet MS'} fontSize={22}>
            <Todo />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

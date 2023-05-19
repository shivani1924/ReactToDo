import { Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';



// eslint-disable-next-line arrow-body-style
const ClockIn1 = ({ start, timer, clockOut, isbreak, Resume, Break, ClockIn }) => {
  return (
    <Grid container spacing={2} textAlign={'center'}>
      <Grid item xs={12} sm={6} md={12} fontFamily={'Trebuchet MS'} fontSize={22}>
        {start != null ? (
          <Grid item xs={12} sm={6} md={12} bgcolor="#D1E9FC" fontFamily={'Trebuchet MS'} fontSize={22}>
            {/* <Typography variant="subtitle10"> */}
            {timer[0] >= 10 ? timer[0] : 0 + timer[0]} :{timer[1] >= 10 ? timer[1] : 0 + timer[1]} :
            {timer[2] >= 10 ? timer[2] : 0 + timer[2]}
            <>
              <>
                <Grid
                  textAlign={'center'}
                  item
                  xs={12}
                  sm={6}
                  md={12}
                  bgcolor="#D1E9FC"
                  fontFamily={'Trebuchet MS'}
                  fontSize={22}
                >
                  <Button variant="contained" onClick={clockOut}>
                    Stop
                  </Button>
                  <>
                    {isbreak === 1 ? (
                      <>
                        <Button variant="contained" onClick={Resume}>
                          Resume
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="contained" onClick={Break}>
                          Break
                        </Button>
                      </>
                    )}
                  </>
                </Grid>
              </>
            </>
          </Grid>
        ) : (
          <Grid item xs={12} sm={6} md={12} bgcolor="#D1E9FC" fontFamily={'Trebuchet MS'} fontSize={22}>
            00:00:00
            <Grid item xs={12} sm={6} md={12} bgcolor="#D1E9FC" fontFamily={'Trebuchet MS'} fontSize={22}>
              <Button variant="contained" onClick={ClockIn}>
                Start
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ClockIn1;

ClockIn1.propTypes = {
  // Your other propTypes here
  start: PropTypes.string,
  timer: PropTypes.array.isRequired,
  clockOut: PropTypes.func.isRequired,
  isbreak: PropTypes.number.isRequired,
  Resume: PropTypes.func.isRequired,
  Break: PropTypes.func.isRequired,
  ClockIn: PropTypes.func.isRequired,
};

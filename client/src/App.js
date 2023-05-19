// routes
import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';

import { useNavigate } from 'react-router-dom';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
// ----------------------------------------------------------------------

export const MyContext = createContext();
export const ChangeDate = createContext();
export const loggedStatus = createContext();

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const sendJwt = async () => {
      await axios.interceptors.request.use(
        (config) => {
          if (token) config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        (error) => {
          alert('error.message');
          return Promise.reject(error);
        }
      );
    };
    const token = localStorage.getItem('jwt');

    if (token) {
      sendJwt();
    } else {
      navigate('/');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  axios.interceptors.response.use(
    (response) =>
      // Do something with response data
      response,
    (error) => {
      // Do something with response error
      const err = error.response.status;
      if (err === 498) {
        // DELETE YOUR TOKEN
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');

        navigate('/');
      }
      return Promise.reject(error);
    }
  );
  const iState = '';
  const reducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_AUTH_DATA':
        console.log(action);
        return action.payload;
      default:
        return state;
    }
  };
  const dateReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_AUTH_DATA':
        console.log(action);
        return action.payload;
      default:
        return state;
    }
  };
  const loggedReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_lOGGED_STATUS':
        console.log(action);
        return action.payload;
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(reducer, iState);
  const [selectedDate, dispatchDate] = useReducer(dateReducer, iState);
  const [logged, dispatchStatus] = useReducer(loggedReducer, iState);

  return (
    <ThemeProvider>
      <loggedStatus.Provider value={{ logged, dispatchStatus }}>
        <MyContext.Provider value={{ data, dispatch }}>
          <ChangeDate.Provider value={{ selectedDate, dispatchDate }}>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ChangeDate.Provider>
        </MyContext.Provider>
      </loggedStatus.Provider>
    </ThemeProvider>
  );
}

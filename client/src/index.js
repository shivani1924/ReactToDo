import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter,useNavigate } from 'react-router-dom';

//
import axios from 'axios';

import { configs } from 'eslint-plugin-prettier';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
// import { useEffect } from 'react';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

  // axios.interceptors.request.use((config) => {
  //   const token = localStorage.getItem('jwt');
  
  //   if(token) config.headers.Authorization = `Bearer ${token}`;
  //   return config
  // },error => {
  //   return Promise.reject(error);
  
  // })

  // useEffect(()=>{
  //   const getMe = async () => {
  //     await axios.post('http://localhost:3001/me','',{
  //       headers:{
  //         Authorization: `bearer ${token}`
  //       }
  //     }).then((response)=>{
  //       config.headers.Authorization = `Bearer ${token}`;
  //     })
  //   }
  //   let token = localStorage.getItem('jwt');
  //   if(token){
  //     getMe()
  //   }
  //   else{
  //     // logout screen
  //   }
  // })
  




root.render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

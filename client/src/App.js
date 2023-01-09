// routes
import { createContext,useReducer } from 'react';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
// ----------------------------------------------------------------------

export const MyContext = createContext()
export default function App() {

  const iState = ""
  const reducer = (state,action) => {
    switch(action.type){
      case 'CHANGE_AUTH_DATA':
        console.log(action);
        return action.payload
        default:
          return state
    }
  }

  const [data,dispatch] = useReducer(reducer,iState)

  return (

    <ThemeProvider>
      <MyContext.Provider value={{data,dispatch}}>
        <ScrollToTop />
        <StyledChart />
        <Router />
      </MyContext.Provider>
    </ThemeProvider>
    
  );
}

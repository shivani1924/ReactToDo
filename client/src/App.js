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
export const ChangeDate = createContext()

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
  const dateReducer = (state,action) => {
    switch(action.type){
      case 'CHANGE_AUTH_DATA':
        console.log(action);
        return action.payload
        default:
          return state
    }
  }

  const [data,dispatch] = useReducer(reducer,iState)
  const [selectedDate,dispatchDate] = useReducer(dateReducer,iState)


  return (

    <ThemeProvider>
      <MyContext.Provider value={{data,dispatch}}>
      <ChangeDate.Provider value={{selectedDate,dispatchDate}}>

        <ScrollToTop />
        <StyledChart />
        <Router />
        </ChangeDate.Provider>
      </MyContext.Provider>
    </ThemeProvider>
    
  );
}

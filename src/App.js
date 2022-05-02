import logo from './logo.svg';
import './App.css';
import { Navbar } from './Navbar';
import { Home } from './Home';
import { Notes } from './Notes';
import {onAuthStateChanged} from "firebase/auth";

import {useState,useEffect} from "react"


import {auth} from "./firebase"

import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {


  const [user,setUser]  = useState();
  const [signInAction,setSignInAction] = useState(null)


  useEffect(() => {
    onAuthStateChanged(auth,(e) => {
      setUser(e)
    })
  })

  

  return (
    <div className="App">

<ThemeProvider theme={darkTheme}>  
      <Navbar user={user} signInFunction={signInAction}/>
      <Home setSignInAction={setSignInAction}/>
      {user && <Notes></Notes>}
  </ThemeProvider>

    </div>
  );
}

export default App;

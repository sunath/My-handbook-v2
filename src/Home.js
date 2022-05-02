
import Hero from "./hero.jpg";

import { Button, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Divider } from "@mui/material";


import {User} from "./firebase";

import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';

import useMediaQuery from '@mui/material/useMediaQuery';


import React, { useEffect, useState } from "react";

import "./Home.css";

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { SignIn } from "./SignIn";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  


export const Home = (props) => {


    const [showSignPanel,setSignPanelState] = useState(false);

    const [currentWidowWidth,setCurrentWindowWidth] = useState(0);


  

    useEffect(() => {
        // props.setSignInAction = setSignPanelState;
    },[])


    const changeSignPanelState = () =>{
        setSignPanelState(!showSignPanel);
    }







    

    return (
        <div className="hero">
                <div className="text-content">
                    <h1 className="main-text">Take it <span>easy</span>. We help you</h1>
                    <p className="main-description">Create a <span>List</span> , <span>Bucket List</span> , <span>Todos</span> </p>
                    <Button variant="contained" className="main-content-button" onClick={changeSignPanelState}>Sign Up or Login</Button>

                    <Dialog open={showSignPanel}
                    
                    TransitionComponent={Transition}
                    keepMounted
                    >
                        


                        <DialogContent>

                            
                                <SignIn closeAction={setSignPanelState}/>


                        </DialogContent>

                        <DialogActions>
                            <Button onClick={changeSignPanelState} variant="contained" color="error"><CloseIcon></CloseIcon></Button>
                        </DialogActions>
                    </Dialog>
                    {/* <Button variant="outlined" className="main-content-button">Scroll Down</Button> */}
                </div>
        </div>
    )
}
import Button from '@mui/material/Button';

import React from "react";
import "./Navbar.css";

import { MenuItem } from '@mui/material';
import { Menu } from '@mui/material';

import {User} from "./firebase"

export function Navbar (props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);  
    };

    const signOutUser =() => {
      if (props.user){
        User.signOutUser()
    }
    }



    return (
        <header>
            <h2 className='header__title'>My-Books</h2>
            <div className="header__user">
                <Button variant="outlined"
                
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}

                >{props.user?.displayName || 'MyAccount'}</Button>
                <div>
      
      
        {props.user ?
        
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        
        <MenuItem onClick={signOutUser}>Logout</MenuItem> 
        
        </Menu>

        : ''} 
      
    </div>
            </div>
        </header>
    )
}
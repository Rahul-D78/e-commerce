import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, Avatar, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../assets/commerce.png'

import useStyle from './styles';


const Navbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyle();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    // console.log(user);
    const Logout = () => {
       dispatch({ type: 'LOGOUT' })

       history.push('/');

       setUser(null);
    }

    
    useEffect(() => {
        //check for the token
        const token = user?.token;

        //JWT.......
        setUser(JSON.parse(localStorage.getItem('profile')))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])
    
    return (
        <div>

           <AppBar position="fixed" className={classes.appBar} color="inherit">
             <Toolbar>
                <Typography  component={Link} to="/" variant="h6"  className={classes.title} color="inherit">
                    <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>
                    Commerce.js
                </Typography>
                <div className={classes.grow} />
                <div className={classes.button}>
                    <IconButton aria-label="show cart items">
                        <Badge badgeContent={2} color="secondary">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                </div>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" color="secondary" onClick={Logout}>LogOUT</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign IN</Button>
                )}
             </Toolbar>
           </AppBar>

        </div>
    )
}

export default Navbar
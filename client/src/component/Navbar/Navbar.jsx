import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, Avatar, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../assets/commerce.png';
// import decode from 'jwt-decode';
import useStyle from './styles';


const Navbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyle();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    // console.log(user.token.name);
    const Logout = () => {
       dispatch({ type: 'LOGOUT' })

       history.push('/');

       setUser(null);
    }

    
    useEffect(() => {
        //check for the token
        // const token = user?.token;
        //JWT....... Token expiry validation 
        // if(token) {
        //     const decodedToken = decode(token);
        //     if(decodedToken.exp * 1000 < new Date().getTime()) Logout();
        // }
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
                {user ?(
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name} src={user.image}>{user.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.name}</Typography>
                        <Button variant="contained" color="secondary" onClick={Logout}>LogOUT</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign IN</Button>
                )}
                <Button variant="contained" color="primary" component={Link} to="/form">Add a Product</Button>
             </Toolbar>
           </AppBar>

        </div>
    )
}

export default Navbar
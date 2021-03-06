import { Avatar, Container, Paper, Typography, Grid, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Input from './Input'
import {GoogleLogin} from 'react-google-login'
import useStyles from './styles'
import Icon from './icon'
import { useDispatch } from 'react-redux'

import { login, signup } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '' ,password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [showPass, setShowPass] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp) {
            dispatch(signup(formData, history));
        }else {
            dispatch(login(formData, history));
        }
    }; 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    } 
    const handleShowPass = () => setShowPass((prevShowPass) => !prevShowPass)
 
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPass(false)
    }

    const googleSuccess = (res) => {
       const result = res?.profileObj;
       const token = res?.tokenId;
       try {
           dispatch({ type: 'AUTH', data: { result, token } })
           history.push('/');
        } catch (error) {
           console.log(error);
       }
    }
    const googleFailure = () => {
       console.log('Failure ! Please Try again'); 
    }
    return (
        
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half></Input>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half></Input>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPass ? "text" : "password"} handleShowPass={handleShowPass} />
                        { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"  /> }
                    </Grid>
                    <GoogleLogin
                        clientId=""
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained" startIcon={<Icon />}>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />       
                    <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? 'Already Have an acoount? Sign In' : "don't Have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;

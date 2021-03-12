import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { TextField, Typography, Button, Paper } from '@material-ui/core';
// import FileBase from 'react-file-base64'
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';

//updateProds
import { createProds, updateProds } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {

    const history = useHistory();
    const post = useSelector((state) => (currentId ? state.posts.find((p) => p.id === currentId): null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const [postData, setPostData] = useState({
        name:"", price:0,manufacture:"",image:"", description:"", category: ""
    });

    const user = JSON.parse(localStorage.getItem('profile'));

    // const handleClick = () => {
    //   history.push('/');
    // }
    
    useEffect(() => {
      if(post) setPostData(post);
    }, [post])

    const clear = () => {
    //  setCurrentId(0);
     setPostData({  name:"", price:0,manufacture:"",image:"", description:"", category: "" })
    }
    const handleSubmit = async (e) =>{
       e.preventDefault();

      if(currentId ) {
        dispatch(updateProds(currentId, { ...postData, name: user?.name}));
        clear()
      }else {
        dispatch(createProds({ ...postData, name: user?.name}))
        clear()
      };
    }; 

   
    if(!user) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please sign in to create a new product and add it to your cart .
          </Typography>
        </Paper>
      )
    }

    return (
 
      <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6"> {currentId ? 'Editing' : 'create '} Your Product</Typography>
            <TextField name="name" variant="outlined" label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value})}/>
            <TextField type="number" name="price" variant="outlined" label="Price" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value})}/>
            <TextField name="image" variant="outlined" label="Image" fullWidth value={postData.image} onChange={(e) => setPostData({ ...postData, image: e.target.value})}/>
            <TextField name="description" variant="outlined" label="Description" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value})}/>
            <TextField name="manufacture" variant="outlined" label="manufacture" fullWidth value={postData.manufacture} onChange={(e) => setPostData({ ...postData, manufacture: e.target.value})}/>
            <TextField name="category" variant="outlined" label="category" fullWidth value={postData.category} onChange={(e) => setPostData({ ...postData, category: e.target.value})}/>
            {/* <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div> */}
            <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" size="large" fullWidth>submit</Button>
            <Button variant="contained" color="secondary" onClick={clear}  size="small" fullWidth>clear</Button>
          </form>
      </Paper>

    )
}

export default Form;
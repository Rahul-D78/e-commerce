import React, { useState } from 'react'
import { TextField, Typography, Button, Paper } from '@material-ui/core'
// import FileBase from 'react-file-base64'
import useStyles from './styles'
import { useDispatch } from 'react-redux';

//updateProds
import { createProds } from '../../actions/posts'

const Form = ({ currentId, setCurrentId }) => {

    // const post = useSelector((state) => (currentId ? state.posts.find((p) => p.id === currentId): null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const [postData, setPostData] = useState({
        name:"", price:0,manufacture:"",image:"", description:""
    })

    const handleSubmit = (e) =>{
       e.preventDefault();

      // if(currentId) {
      //    dispatch(updateProds(currentId, postData));
      // }else {

        dispatch(createProds(postData))
      // }
      // clear()
    }

    // useEffect(() => {
    //   if(post) setPostData(post);
    // }, [post])

    const clear = () => {
     // setCurrentId(null);
     // setPostData({  name:"", price:0,manufacture:"",image:"", description:"" })
    }

    return (

      <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6"> add your product </Typography>
            <TextField name="name" variant="outlined" label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value})}/>
            <TextField type="number" name="price" variant="outlined" label="Price" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value})}/>
            <TextField name="image" variant="outlined" label="Image" fullWidth value={postData.image} onChange={(e) => setPostData({ ...postData, image: e.target.value})}/>
            <TextField name="description" variant="outlined" label="Description" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value})}/>
            <TextField name="manufacture" variant="outlined" label="manufacture" fullWidth value={postData.manufacture} onChange={(e) => setPostData({ ...postData, manufacture: e.target.value})}/>
            {/* <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div> */}
            <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" size="large" fullWidth>submit</Button>
            <Button variant="contained" color="secondary" onClick={clear}  size="small" fullWidth>clear</Button>
          </form>
      </Paper>

    )
}

export default Form
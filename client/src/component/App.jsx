import React, {useEffect, useState} from 'react';
import Products from './Products/Products';
import Navbar from './Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts'
import Form from './Form/Form'
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {

    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
       dispatch(getPosts());
    }, [currentId, dispatch])

    return (
        <div>
         
        <BrowserRouter>

        <Navbar/>

        <Route exact path='/'>
        <Products setCurrentId={setCurrentId}/>
        </Route>
        
        <Route path='/product'>   
        <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Route>

        </BrowserRouter>
        </div>
    )
}

export default App
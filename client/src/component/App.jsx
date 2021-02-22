import React, {useEffect} from 'react';
import Products from './Products/Products';
import Navbar from './Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts'
import Form from './Form/Form'
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getPosts());
    }, [dispatch])

    return (
        <div>
         
        <BrowserRouter>

        <Navbar/>

        <Route exact path='/'>
        <Products />
        </Route>
        
        <Route path='/product'>   
        <Form/>
        </Route>

        </BrowserRouter>
        </div>
    )
}

export default App
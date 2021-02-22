import React, {useEffect} from 'react';
import Products from './Products/Products';
import Navbar from './Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts'
import Form from './Form/Form'

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getPosts());
    }, [dispatch])

    return (
        <div>

        <Navbar/>,
        <Products />
        <Form/>
        </div>
    )
}

export default App
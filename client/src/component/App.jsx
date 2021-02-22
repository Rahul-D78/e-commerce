import React, {useEffect} from 'react';
import Products from './Products/Products';
import Navbar from './Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts'

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getPosts());
    }, [dispatch])

    return (
        <div>

        <Navbar/>,
        <Products />
        </div>
    )
}

export default App
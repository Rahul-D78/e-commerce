import React, {useEffect, useState} from 'react';
import Products from './Products/Products';
// import Auth from './Auth/Auth'
import Navbar from './Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts'
import Form from './Form/Form'
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {

    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
       dispatch(getPosts());
    }, [currentId, dispatch])

    return (
        <div>

            <Navbar/>


           <Products setCurrentId={setCurrentId} />
           <Form setCurrentId={setCurrentId} currentId={currentId} />
        {/* <BrowserRouter>

        <Navbar/>

        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/form" exact component={Form} />
        </Switch>

        </BrowserRouter> */}
        </div>
    )
}

export default App
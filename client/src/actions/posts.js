// import { Dialpad } from '@material-ui/icons';
import * as api from '../api';

//Action Creators
export const getPosts = () => async (dispatch) => {
     
    try {
        const { data } = await api.fetchProds();
       
        dispatch({ type: 'FETCH_ALL', payload: data });  
    } catch (error) {
       console.log(error.message); 
    }
}

export const createProds = (post) => async (dispatch) => {

   try {
       const { data } = await api.createProds(post);

       dispatch({ type: 'CREATE', payload: data })
   } catch (error) {
       console.log(error);
   }

}

/**
 export const updateProds = (id, post) => async (dispatch) => {
    try {
         
        const { data } = await api.updateProds(id, post)
         
        dispatch({ type: 'UPDATE', payload: data})
         
    } catch (error) {
        console.log(error);
    }
}
*/

export const deleteProd = (id) => async(dispatch) => {
    try {
        const {data} = await api.deleteProd(id)
        
        dispatch({type: 'DELETE', payload: data})
    } catch (error) {
        console.log(error);
    }
}
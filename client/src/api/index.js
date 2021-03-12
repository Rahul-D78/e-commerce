import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:4000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Token ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

//GET all the products from our database
export const fetchProds = () => API.get('/products');

//POST a new record onto our database using the form
export const createProds = (newPost) => API.post('/products', newPost);

//PATCH a Product
export const updateProds = (id, updatedPost) => API.patch(`/products/${id}/update`, updatedPost); 

//DELETE a Product
export const deleteProd = (id) => API.delete(`/products/${id}/delete`)

export const signUp = (formData) => API.post('/users/register', formData);
export const logIn  = (formData) => API.post('/users/login', formData);
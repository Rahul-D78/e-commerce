import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:4000'})

//GET all the products from our database
export const fetchProds = () => API.get('/products');

//POST a new record onto our database using the form
export const createProds = (newPost) => API.post('/products', newPost);

//PATCH a Product
export const updateProds = (id, updatedPost) => API.patch(`/products/${id}/update`, updatedPost); 

//DELETE a Product
export const deleteProd = (id) => axios.delete(`'/products'/${id}`)

export const signUp = (formData) => API.post('/users/login', formData);
export const logIn  = (formData) => API.post('/users/login', formData);
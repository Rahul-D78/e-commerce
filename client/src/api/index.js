import axios from 'axios'

const url = 'http://localhost:4000/products'

//GET all the products from our database
export const fetchProds = () => axios.get(url);

//POST a new record onto our database using the form
export const createProds = (newPost) => axios.post(url, newPost);

//PATCH a Product
// export const updateProds = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost); 

//DELETE a Product
export const deleteProd = (id) => axios.delete(`${url}/${id}`)
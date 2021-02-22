import axios from 'axios'

const url = 'http://localhost:4000/products'

//GET all the products from our database

export const fetchProds = () => axios.get(url);

//POST a new record onto our database using the form
export const createProds = (newPost) => axios.post(url, newPost)
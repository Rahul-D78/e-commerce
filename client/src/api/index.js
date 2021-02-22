import axios from 'axios'

const url = 'http://localhost:4000/products'

export const constFetchProds = () => axios.get(url);
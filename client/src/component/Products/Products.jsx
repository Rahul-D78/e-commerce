import React from 'react'
import Product from './Product/Product'
import { Grid } from '@material-ui/core'
import useStyles from './styles'

const products = [
    {id: 1, name: 'apple-macbook', manufacture: 'Apple', price: '20.5'},
    {id: 1, name: 'sony-wh-100', manufacture: 'Sony', price: '21.5'}
];

const Products = props => {

    const classes = useStyles();

    return (
        <main className={classes.content}>
           <div className={classes.toolbar}/>
           <Grid container justify="center" spacing={4}>
              {products.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} lg={3}>
                    <Product product={product}  />
                  </Grid>
              ))}

           </Grid> 
        </main>
    )
}
export default Products
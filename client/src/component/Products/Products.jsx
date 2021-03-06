import React from 'react'
import Product from './Product/Product'
import { Grid, CircularProgress } from '@material-ui/core'
import useStyles from './styles'

import { useSelector } from 'react-redux'
import Form from '../Form/Form'

const Products = ({ setCurrentId }) => {

    const classes = useStyles();
    const products = useSelector((state) => state.posts)

    console.log(products);

    return (
        !products.length ? <CircularProgress/> :(
        <Grid >
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                    <Grid container justify="center" spacing={4}>
                        {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} lg={3}>
                            <Product product={product}  setCurrentId={setCurrentId} />
                        </Grid>
                        ))}
                    </Grid> 
            </main>
            <Form/>
        </Grid>
        )
    )
}
export default Products
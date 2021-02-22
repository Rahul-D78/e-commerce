import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './style';
import { Link } from 'react-router-dom';

function Product({product, setCurrentId}) {

    const classes = useStyles();
    return (
        
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image} title={product.name}/>
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography variant="h5" gutterBottom>
                        <Link href="#" onClick={() => setCurrentId(product.id)} color='inherit' style={{color:'black', textDecoration:'none'}}>
                        {product.name}
                        </Link>
                    </Typography>
                    <Typography variant="h5">
                        ${product.price}
                    </Typography>
                </div>
                <Typography variant="body2" color="textSecondary">{product.manufacture}</Typography>
                
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product

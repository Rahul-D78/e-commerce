import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button } from '@material-ui/core';
import { AddShoppingCart, Delete } from '@material-ui/icons';
// import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './style';
// import { Link, Router } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 

import { deleteProd } from '../../../actions/posts'

function Product({product, setCurrentId}) {

    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        
        //TODO: --add a button to delete the prod in a separate details tab 
        

        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image} title={product.name}/>
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography variant="h5" gutterBottom>
                        {/* <Link to="/product" onClick={() => setCurrentId(product.name)} color='inherit' style={{color:'black', textDecoration:'none'}}>
                        {product.name}
                        </Link>                     */}
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        ${product.price}
                    </Typography>
                </div>
                <Typography variant="body2" color="textSecondary">{product.manufacture}</Typography>
                <div className={classes.overlay2}>
                    <Button style={{color: 'black'}} size="small" onClick={() => setCurrentId(product.id)}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>     
            </CardContent>
            <Button style={{display: "flex",justifyContent:'flex-start'}} onClick={() => dispatch(deleteProd(product.id))}>
               <Delete fontSize="small" />
            </Button>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product

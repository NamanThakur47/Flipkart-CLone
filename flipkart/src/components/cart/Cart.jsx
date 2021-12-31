import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {Box,makeStyles, Typography,Button,Grid} from '@material-ui/core';
import {removeFromCart} from '../../redux/actions/cartActions';
import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm';


//component 
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import TotalView from './TotalView';
const useStyle = makeStyles(theme =>({
    component:{
        // marginTop:55,
        padding:'30px 135px',
        display:'flex',
        [theme.breakpoints.down('sm')]:{
            padding:'15px 0'
        }
    },
    leftComponent:{
        // width:'67%',
        [theme.breakpoints.down('sm')]:{
            marginBottom:15
        }
    },
    header:{
        padding:'15px 24px',
        background:'#fff'
    },
    placeOrder:{
        background:'#fb641b',
        color:'#fff',
        borderRadius:2,
        width:250,
        height:50,
        display:'flex',
        marginLeft:'auto',
    },
    bottom:{
        padding:'16px 22px',
        background:'#fff',
        borderTop:'1px solid #f0f0f0',
        boxShadow:'0 2px 10px 0 rgb(0 0 0/10%)'
    }
}));

const Cart = () =>{

    const classes = useStyle();

    const { cartItems } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    useEffect(() =>{
        console.log(cartItems);
    }) 

    const removeItemFromCart = (id) =>{
        dispatch(removeFromCart(id));
    }
    
    const buyNow = async () =>{
        let response = await payUsingPaytm({ amount : 500, email:'palnaman.ktecheducation@gmail.com' });

        let information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response
    
        }

        post(information);


    }

    return(
       <>
           {
               cartItems.length ? 
                <Grid container className={classes.component}>
                    <Grid item lg={9} md={9} sm={12} xs={12} className={classes.leftComponent}>
                            <Box className={classes.header}>
                                <Typography style={{fontWeight:600,fontSize:18}} >My Cart ({cartItems.length}) </Typography>
                            </Box>
                        {
                            cartItems.map(item =>(
                                <CartItem item={item} removeItemFromCart={removeItemFromCart} />
                            ))
                        }
                        
                        <Box className={classes.bottom}>
                            <Button onClick={() => buyNow()} variant="contained" className={classes.placeOrder}>Place Order</Button>
                        </Box>

                    </Grid>

                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <TotalView cartItems={cartItems} />
                    </Grid>
                    
                    
                </Grid>

               : <EmptyCart />
           }
       </>
    )
}
export default Cart;
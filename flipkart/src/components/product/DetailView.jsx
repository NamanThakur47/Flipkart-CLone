import clsx from 'clsx';
import { Box , makeStyles,Table,TableRow, TableBody, TableCell, Typography,Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productActions";
import { LocalOffer as Badge } from '@material-ui/icons';

// Component//

import ActionItems from './ActionItems';


const useStyle = makeStyles(theme =>({
    component:{
        marginTop:55,
        background: '#F2F2F2'
    },
    container:{
        // margin:'0 80px',
        background:'#fff',
        display:'flex',
        [theme.breakpoints.down('md')]:{
            margin:0
        }
    },
    rightContainer:{
        marginTop:50,
        '& > *':{
            marginTop:10
        }
    },
    smallText:{
        fontSize:14,
        verticalAlign:'baseline',
        '& > *':{
            fontSize:14,
            marginTop:10
        }
    },
    greyTextColor:{
         color:'#878787',
    },
    price:{
        fontSize:28
    },
    badge:{
        fontSize:14,
        marginRight:10,
        color:'#00CC00'

    }
}));

const DetailView = () =>{
    const classes = useStyle();

    const sellerURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';

    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'

    const {product } = useSelector(state => state.getProductDetails);   

    const date = new Date( new Date().getTime() +(5 * 24 * 60 * 60 * 1000)) ;

    const {id} = useParams();

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getProductDetails(id));
    },[dispatch])

    return (
      <Box className={classes.component}>
        { product && Object.keys(product).length &&
            <Grid container className={classes.container}>
                <Grid item lg={4} md={4} sm={8} xs={12} style={{minWidth: '30%'}}>
                  <ActionItems product={product}/> 
                </Grid>
                <Grid item lg={8} md={8} sm={8} xs={12}  className={classes.rightContainer}>
                    <Typography>{product.title.longTitle}</Typography>
                    <Typography className={ clsx(classes.smallText,classes.greyTextColor) }>
                    8 Rating & 1 Review 
                    <span> <img src={fassured} style={{width:77, marginLeft:20}} /></span>
                    </Typography>
                    <Typography>
                        <span className={classes.price}>₹{product.price.cost}</span> &nbsp; &nbsp; &nbsp;
                        <span className={classes.greyTextColor}><strike>₹{product.price.mrp}</strike></span> &nbsp; &nbsp; &nbsp; 
                        <span style={{color:'#388E3C'}} >{product.price.discount} off</span>
                    </Typography>
                    <Typography style={{marginTop:20,fontWeight: 600}} >Available offers</Typography>
                <Box className={classes.smallText}>
                <Typography><Badge className={classes.badge} />Special PriceGet extra 10% off (price inclusive of discount)</Typography>
                <Typography><Badge className={classes.badge} />Bank OfferFlat ₹100 off on first Flipkart Pay Later order of ₹500 and above</Typography>
                <Typography><Badge className={classes.badge} />Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit Card</Typography>
                <Typography><Badge className={classes.badge} />Bank Offer20% off on 1st txn with Amex Network Cards issued by ICICI Bank,IndusInd Bank,SBI Cards and Mobikwik</Typography>
                </Box>
                <Table>
                    <TableBody>
                        <TableRow className={classes.smallText}>
                            <TableCell className={classes.greyTextColor}>Delivery</TableCell>
                            <TableCell style={{fontWeight:600}} >{date.toDateString()} | ₹40 </TableCell>
                        </TableRow>
                        <TableRow className={classes.smallText}>
                            <TableCell className={classes.greyTextColor}>Warrenty</TableCell>
                            <TableCell >No Warrenty</TableCell>
                        </TableRow>
                        <TableRow className={classes.smallText}>
                            <TableCell className={classes.greyTextColor}>Seller</TableCell>
                            <TableCell className={classes.smallText} >
                                <span style={{color:'#2874f0'}}  >SuperComNet</span>
                                <Typography>GST Invoice Available</Typography>
                                <Typography>14 Days Return Policy</Typography>
                                <Typography>View More Seller Starting From ₹300</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow className={classes.smallText}>
                            <TableCell colspan={2}>
                                <img src={sellerURL} style={{width:390}} />
                            </TableCell>
                        </TableRow>
                        <TableRow className={classes.smallText}>
                            <TableCell className={classes.greyTextColor}>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </Grid>
            </Grid>
        }
      </Box>
    )
}

export default DetailView;
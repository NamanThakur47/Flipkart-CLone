import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';

const useStyle = makeStyles(theme=> ({
    component:{
        margin:'80px 140px',
        width:'80%',
        background:'#fff',
        height:'65vh',
        [theme.breakpoints.down('sm')]:{
            margin:50
        }
    },
    image:{
        width:'15%',
    },
    container:{
        textAlign:'center',
        paddingTop:70,
        '& > *':{
            marginTop:10,
            fontSize:14
        }
    }
}));


const EmptyCart = () =>{

    const classes = useStyle();

    const history = useNavigate();



    const addItem =() =>{
        history('/');
    }

    const emptycarturl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';

    return (
        <Box className={classes.component}>
            <Box className={classes.container}>
                 <img src={emptycarturl} className={classes.image} />
                    <Typography >Your Cart Is Empty !</Typography>
                    <Typography>Add Items To It Now.</Typography>
                    <Button variant="contained" style={{marginTop:20, padding:'12px 70px',  borderRadius:2, fonSize:14,background:'#2874f0',color:'#fff'}} onClick={() => addItem()}>Shop Now</Button>
            </Box>
        </Box>
    )
}

export default EmptyCart;
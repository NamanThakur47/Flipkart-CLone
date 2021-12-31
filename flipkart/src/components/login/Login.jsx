import { useState } from "react";
import { Box, Dialog, DialogContent,makeStyles, TextField, Typography, Button } from "@material-ui/core";
import {authenticateSignup , authenticateLogin} from '../../service/api';

const useStyle = makeStyles({
    component:{
        height:'70vh',
        width:'90vh'
    },
    image:{
        backgroundImage:`url(${'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png'})`,
        height:'70vh',
        backgroundRepeat:'no-repeat',
        background:'#2874f0',
        width:'40%',
        backgroundPosition:'center 85%',
        padding:'45px 35px',
        '& > *':{
            color:'#ffffff',
            fontWeight:600,
        }
    },
    login:{
        padding:'25px 35px',
        display:'flex',
        flex:1,
        flexDirection:'column',
        '& > *':{
            marginTop:20
        }
    },
    text:{
        color:'#878787',
        fontSize:12
    },
    loginBtn:{
        textTransform:'none',
        background:'#fB641B',
        color:'#ffffff',
        height:48,
        borderRadius:2
    },
    requestBtn:{
        textTransform:'none',
        background:'#FFFFFF',
        color:'#2874f0',
        height:48,
        borderRadius:2,
        boxShadow:'0 2px 4px 0 rgb(0 0 0 / 20%)'
    },
    createText:{
        textAlign:'center',
        marginTop:'auto',
        fontSize:14,
        color:'#2874f0',
        fontWeight:600,
        cursor:'pointer'
    },
    error:{
        fontSize:10,
        color:'#ff6161',
        marginTop:10,
        fontWeight:600,
        lineHeight:0
    }
})

const initialValue = {
    login:{
        view:'login',
        heading:'Login',
        subHeading:'Get Access To Your Wishlist And Recommendations'

    },
    signup:{
        view:'signup',
        heading:'Look Like you Are New Here !',
        subHeading:'Sign Up With Your Mobile Number To Get Started'
    }
}

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
}

const loginInitialValues ={
    username:'',
    password:''
}

const Login = ({open , setOpen , setAccount}) =>{

    const classes = useStyle();

    
    const [account,toggleAccount] = useState(initialValue.login);
    const [signup,setSignup] = useState(signupInitialValues);
    const [login,setLogin] = useState(loginInitialValues);
    const [error,setError] = useState(false);

    const handleClose = () =>{
        setOpen(false);
        toggleAccount(initialValue.login)

    }

    const toggleUserAccount = () =>{
        toggleAccount(initialValue.signup)
    }

    const signupUser = async () =>{
      let response =   await authenticateSignup(signup);
      if(!response) return;
      handleClose();
      setAccount(signup.username);
    }

    const loginUser = async () =>{
        let response = await authenticateLogin(login);
        if(!response) 
        {
            setError(true);
            return
          }
        setAccount(login.username);
    }


    const onInputChange = (e) =>{
        setSignup ({...signup,[e.target.name]:e.target.value});
        console.log(signup);
    }

    const onValueChange = (e) =>{
        setLogin({...login,[e.target.name] : e.target.value});
    }


    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent className = {classes.component}>
                   <Box style={{display:'flex'}}>
                       <Box className={classes.image}>
                            <Typography variant="h5"> {account.heading} </Typography>
                            <Typography style={{marginTop:20}}> {account.subHeading} </Typography>
                       </Box>
                        {
                            account.view === 'login' ? 
                            <Box className={classes.login}>
                                <TextField onChange={(e) => onValueChange(e)} name='username' label='Enter Email / Mobile No.' />
                                <TextField onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />
                                { error && <Typography className={classes.error}>Invalid Username Or Password</Typography>}

                                <Typography className={classes.text}>By Continuing , You Agree To Flipkart's Term Of Use And Privacy Policy.</Typography>
                                <Button variant="contained" onClick= {() => loginUser()} className={classes.loginBtn}>Login</Button>
                                <Typography className={classes.text} style={{textAlign:'center'}}>Or</Typography>
                                <Button variant="contained" className={classes.requestBtn}>Request OTP</Button>
                                <Typography onClick={() => toggleUserAccount()} className={classes.createText}>New To Flipkat Create A Account</Typography>
                            </Box> :

                            <Box className={classes.login}>
                                <TextField onChange={(e) => onInputChange(e)} name='firstname' label='Enter First Name' />
                                <TextField onChange={(e) => onInputChange(e)} name='lastname' label='Enter Last Name' />
                                <TextField onChange={(e) => onInputChange(e)} name='username' label='Enter UserName' />
                                <TextField onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                                <TextField onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                                <TextField onChange={(e) => onInputChange(e)} name='phone' label='Enter Mobile Number' />
                                <Button variant="contained" onClick={ () => signupUser()} className={classes.loginBtn}>Sign up</Button>
                            </Box>
                        }
                   </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Login;
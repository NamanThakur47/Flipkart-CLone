import Carousel from "react-material-ui-carousel";
import { bannerData } from "../../constant/data";
import { makeStyles, Slide } from "@material-ui/core";


const useStyle = makeStyles( theme=> ({
    image:{
        width:'100%',
        height:350,
        [theme.breakpoints.down('sm')]:{
            objectFit:'cover',
            height: 200
        }
    },
    carousel:{
        marginTop:10
    }
}));
const Banner =  () =>{
    const classes = useStyle();
    return(
        <Carousel
            autoPlay={true}
            animation='slide'
            indicators = {false}
            navButtonsAlwaysVisible = {true}
            cycleNavigation = {true}
            navButtonsProps = {{
                style:{
                    background:'#FFFFFF',
                    color:'#494949',
                    borderRadius:0,
                    margin:0
                }
            }}
            className = {classes.carousel}
        >
            {
                bannerData.map(image =>( 
                <img src={image} className={classes.image} />
                ))
            }
        </Carousel>
    )
}
export default Banner;
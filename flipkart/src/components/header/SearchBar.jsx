import { makeStyles , fade, InputBase, ListItem,List } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Search } from "@material-ui/icons";
import { useSelector,useDispatch } from "react-redux";
import { getProducts as listProducts } from "../../redux/actions/productActions";

const useStyle = makeStyles(theme => ({
    search:{
        borderRadius:2,
        backgroundColor:'#fff',
        marginLeft:10,
        width:'38%',
        display:'flex',
    },
    searchIcon:{
        padding:5,
        height:'100%',
        display:'flex',
        color:'blue'
    },
    inputRoot:{
        fontSize:13,
        width:'100%'
    },
    inputInput:{
        paddingLeft:20
        //vertical padding + font size from searchicon//
        
    },
}));
const SearchBar = () =>{
    const classes = useStyle();

    const [text,setText] = useState();
    const getText = (text) => {
         setText(text);

    }

    const getProducts = useSelector(state => state.getProducts);
    const { products } = getProducts;
     
    const dispatch = useDispatch();
   
   useEffect(() => {
       dispatch(listProducts())
   }, [dispatch])

    return (
        <div className={classes.search}>
            <InputBase 
            placeholder = "Search For Products Brands And More   " 
            classes = {{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            inputProps = {{'aria-label' : 'search'}}
            onChange={(e) => getText(e.target.value)}
            />
            <div className={classes.searchIcon}>
                <searchIcon/>
            </div>
            {
                text && 
                <List>
                    {
                        products.filter(product => product.title.longTitle.includes( text.toLowerCase())).map(product=>(
                            <ListItem>
                                {product.title.longTitle}
                            </ListItem>
                        ))
                    }
                </List>
            }
        </div>
    )
}

export default SearchBar;
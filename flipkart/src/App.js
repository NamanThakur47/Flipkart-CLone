import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Box} from "@material-ui/core";
//Components
import Header from './components/header/Header';
import Home from './components/home/Home';
import Cart from './components/cart/Cart';
import { TemplateProvider } from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import DetailView from './components/product/DetailView'; 


function App() {
  return (
    <TemplateProvider>
     <ContextProvider>    
        <BrowserRouter>
          <Header />
          <Box style={{marginTop:54}}>
          <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/cart" element={<Cart/>} />
              <Route exact path="/product/:id" element={<DetailView />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>

  );
}

export default App;

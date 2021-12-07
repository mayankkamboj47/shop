import Nav from './Nav';
import Home from './Home';
import FormIn from './FormIn';
import {BrowserRouter as Router, Switch, Route} from'react-router-dom';
import ProductList from './ProductList';
import CategoryPage from './CategoryPage';
import { Box } from '@chakra-ui/layout';
import ProductPage from './ProductPage';
import UserProfile from './UserProfile';
import { useState } from 'react';

function App() {
  let [cartItemsCount, setCartItemsCount] = useState(0);
  let incrementCartCount = ()=>setCartItemsCount(cartItemsCount+1);
  return (
  <Router>
    <Nav cartItemsCount={cartItemsCount} setCartItemsCount={setCartItemsCount}/>
    <Box maxWidth='1480px' margin='0 auto'>
    <Switch>
      <Route path='/login'>
        <FormIn action='Login'/>
      </Route>
      <Route path='/signup'>
        <FormIn action='Sign Up'/>
      </Route>
      <Route path='/cart'>
        <ProductList purpose='cart'/>
      </Route>
      <Route path='/wishlist'>
        <ProductList purpose='wishlist'/>
      </Route>
      <Route path='/c/:category'> 
          <CategoryPage incrementCartCount={incrementCartCount}/>
      </Route>
      <Route path='/p/:title'> 
          <ProductPage incrementCartCount={incrementCartCount}/>
      </Route>
      <Route path='/userprofile'> 
        <UserProfile />
      </Route>
      <Route exact path='/'>
        <Home incrementCartCount={incrementCartCount}/>
      </Route>
    </Switch>
    </Box>

  </Router>);
}

export default App;

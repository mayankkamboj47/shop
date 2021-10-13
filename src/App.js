import {Nav} from './Nav';
import Home from './Home';
import FormIn from './FormIn';
import {BrowserRouter as Router, Switch, Route} from'react-router-dom';
import ProductList from './ProductList';
import CategoryPage from './CategoryPage';
import { Box } from '@chakra-ui/layout';
import ProductPage from './ProductPage';
import UserProfile from './UserProfile';
function App() {
  return (
  <Router>
    <Nav />
    <Box maxWidth='1480px' margin='0 auto'>
    <Switch>
      <Route path='/login'>
        <FormIn action='Login'/>
      </Route>
      <Route path='/signup'>
        <FormIn action='Sign Up'/>
      </Route>
      <Route path='/bag'>
        <ProductList purpose='cart'/>
      </Route>
      <Route path='/wishlist'>
        <ProductList purpose='wishlist'/>
      </Route>
      <Route path='/c/:category'>
          <CategoryPage />
      </Route>
      <Route path='/p/:title'>
          <ProductPage />
      </Route>
      <Route path='/userprofile'>
        <UserProfile />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
    </Box>

  </Router>);
}

export default App;

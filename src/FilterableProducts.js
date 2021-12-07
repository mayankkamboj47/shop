import FilterBar from './FilterBar';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from './Card';
import { Heading, SimpleGrid } from '@chakra-ui/layout';

const MIN_PRICE = 0;
const MAX_PRICE = 100;

export default function FilterableProducts({dataSource, incrementCartCount}){
  let [products, setProducts] = useState([]);
  let [lowPrice, setLowPrice] = useState(MIN_PRICE);
  let [highPrice, setHighPrice] = useState(MAX_PRICE);
  let [minRating, setMinRating] = useState(1);
  let [mostPopularFirst, setMostPopularFirst] = useState(false);
  let [cheapestFirst, setCheapestFirst] = useState(false);
  useEffect(()=>{
    axios.get(dataSource).then(res=>setProducts(res.data));
  },[]);
  let filterOptions = {
    'Price' : {
      start : MIN_PRICE,
      end : MAX_PRICE,
      units : '$',
      onMinChange : setLowPrice,
      onMaxChange : setHighPrice
    },
    'Rating' : {
      start : 1,
      end : 5,
      onMinChange : setMinRating
    }
  };
  let sortOptions = {
    'Popularity' : setMostPopularFirst,
    'Price' : setCheapestFirst
  }
  let filteredProducts = products.filter(
    product=>product.product_cost >=lowPrice && product.product_cost <=highPrice
  ).filter(
    product=>product.product_rating >=minRating
  ); 
  if(mostPopularFirst) 
    filteredProducts.sort(
      (product1,product2)=>
        product2.product_num_of_wishlist - product1.product_num_of_wishlist
    )
  else if(cheapestFirst)
    filteredProducts.sort(
      (product1,product2)=>
        product1.product_cost-product2.product_cost
    )

  return (
  <React.Fragment>
  <FilterBar filterOptions={filterOptions} sortOptions={sortOptions}/>
  <Heading size='md' p='1rem'>{`${filteredProducts.length} Products`}  </Heading>
  <SimpleGrid minChildWidth='300px' spacing='3rem' pl='1rem'>
    {
      filteredProducts.map(product=>{
        return (
          <Card 
            title={product.product_name}
            name={capitalise(product.product_name)}
            price={product.product_cost}
            rating = {product.product_rating}
            numReviews = {product.product_num_of_reviews}
            _id={product._id}
            incrementCartCount = {incrementCartCount}
          />)
      })
  }
  </SimpleGrid>
  </React.Fragment>);
}

function capitalise(str){
  return str.toLowerCase().split(' ').map(word=>word[0].toUpperCase() + word.slice(1)).join(' ');
}
import FilterBar from './FilterBar';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from './Card';
import { SimpleGrid } from '@chakra-ui/layout';
export default function FilterableProducts({dataSource}){
  let [products, setProducts] = useState([]);
  useEffect(()=>{
    axios.get(dataSource).then(res=>setProducts(res.data));
  },[]);
  let filterOptions = {
    'Price' : {
      start : 1,
      end : 100,
      units : '$',
    },
    'Rating' : {
      start : 1,
      end : 5
    }
  };
  let sortOptions = {
    'Popularity' : (v)=>{},
    'Price' : (v)=>{}
  }
  return (
  <React.Fragment>
  <FilterBar filterOptions={filterOptions} sortOptions={sortOptions}/>
  <SimpleGrid minChildWidth='300px' spacing='3rem'>
    {products.map(product=>{
      return (<Card title={product.product_name}
      name={capitalise(product.product_name)}
      price={product.product_cost}
      rating = {product.product_rating}
      numReviews = {product.product_num_of_reviews}
      _id={product._id}
      />)
    })}
  </SimpleGrid>
  </React.Fragment>);
}

function capitalise(str){
  return str.toLowerCase().split(' ').map(word=>word[0].toUpperCase() + word.slice(1)).join(' ');
}
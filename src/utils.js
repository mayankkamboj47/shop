import axios from 'axios';

export function addToCart(_id, quantity=1){
  return axios.get('http://localhost:3001/products/toCart',{
    withCredentials : true,
    params : {
      product_id : _id,
      quantity
    }
  });
}

export function addToWishlist(_id){
  return axios.get('http://localhost:3001/products/toWishlist',{
    withCredentials : true,
    params : {
      product_id : _id
    }
  })
}
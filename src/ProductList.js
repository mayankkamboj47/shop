import { Image } from "@chakra-ui/image";
import { Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import {useState} from "react";
import { Button } from "@chakra-ui/button";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/number-input";
import axios from "axios";

export default function ProductList({purpose, cartItemsCount, setCartItemsCount}){
  let incrementCartCount = ()=>setCartItemsCount(cartItemsCount+1);
  let decrementCartCount = ()=>setCartItemsCount(cartItemsCount-1);
  let resetCartCount = ()=>setCartItemsCount(0);
  if(purpose==='wishlist') return <Wishlist incrementCartCount={incrementCartCount}/>
  else return <Cart decrementCartCount={decrementCartCount} resetCartCount={resetCartCount}/>
}

function Wishlist({incrementCartCount}){
  let [products, setProducts] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3001/user/wishlisted_items',{withCredentials : true}).then(r=>r.data.filter(x=>x)).then(setProducts);
  },[]);
  return (
    <Flex direction='column' width='fit-content' style={{gap : 30}} p='1rem 0 0 1rem'>
      <Heading>Wishlist</Heading>
      { products.length===0 ? <Empty /> : 
        products.map(
        product=>
          <WishlistProduct 
            key={product.title} 
            {...product}
            onMove = {()=>{
              setProducts(products.filter(p=>p._id!==product._id));
              incrementCartCount();
              axios.get('http://localhost:3001/wishlistToCart/'+product._id,{withCredentials : true});
            }}
            onRemove={()=>{
              setProducts(products.filter(p=>p._id!==product._id));
              axios.get('http://localhost:3001/removeFromWishlist/'+product._id,{withCredentials : true});
            }
            }
             />
        )
      }

    </Flex>
    );
}




/**
 * Each product has a product_id. We need to pass the links tho. There are multiple ways to
 * do this. One is to 
 */
function Cart({decrementCartCount, resetCartCount}){
  let [products, setProducts] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3001/user/cart_items',{withCredentials:true}).then(r=>r.data.filter(x=>x)).then(setProducts)
  },[]);
  return (
    <Flex direction='column' width='fit-content' style={{gap : 30}} p='1rem 0 0 1rem'>
    <Heading>Cart</Heading>
    {
      products.map(
        product=>
          <CartProduct 
            key={product.title} 
            {...product}
            onMove={()=>{
              axios.get('http://localhost:3001/cartToWishlist/'+product._id,{withCredentials : true});
              setProducts(products.filter(p=>p._id!==product._id));
              decrementCartCount();
            }}
            onRemove={()=>{
              axios.get('http://localhost:3001/removeFromCart/'+product._id,{withCredentials : true});
              setProducts(products.filter(p=>p._id!==product._id));
              decrementCartCount();
            }
            }
          />
      ).concat([<Button>Buy</Button>])}
  </Flex>
  );
}

function CartProduct({product_name, price, quantity, product_images, onMove, onRemove, _id}){
  let [qty, setQty] = useState(quantity);
  useEffect(()=>{
    // make a call to http://localhost:3001/removeFromCart/+_id, wait and once done,
    // make a call to http://localhost:3001/product/toCart with params : {product_id : _id, quantity : qty}
  },[qty]);
  return <Grid templateColumns='auto auto' columnGap={5}>
    <Image gridRow='span 5' width={150} src={product_images[0].url}>
    </Image>
    <Heading as='h1' gridColumnStart={2} m={0} size='md'>{product_name}</Heading>
    <Text as='strong' fontSize='sm'>{price}</Text>
      <NumInput type='number' min={1} value={qty} onChange={setQty}/>
      <Link onClick={onMove}>Move to wishlist</Link>
      <Link onClick={onRemove}>Remove</Link>
  </Grid>
}

function WishlistProduct({product_name, product_cost, product_images, onMove, onRemove}){
  return <Grid templateColumns='auto auto' columnGap={5}>
    <Image gridRow='span 5' width={150} src={product_images[0].url}>
    </Image>
    <Heading as='h1' gridColumnStart={2} m={0} size='md'>{product_name}</Heading>
    <Text as='strong' fontSize='sm'>{product_cost}</Text>
      <Link onClick={onMove}>Move to cart</Link>
      <Link onClick={onRemove}>Remove</Link>
  </Grid>
}

function NumInput(props){
  return (<NumberInput min={1} height='2.5rem' aria-label='Quantity' defaultValue={1} {...props}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
  </NumberInput>
);
}
function Empty(){
  return <Heading color='gray.400'>
  Nothing in here
  </Heading>
}
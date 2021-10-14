import { Image } from "@chakra-ui/image";
import { Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/layout";
import React from "react";
import { Button } from "@chakra-ui/button";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/number-input";

export default function ProductList({purpose}){
  let products = [
    {title:'Black Dress',brand:'Mango',price:'$40', size:'XL', quantity:1},
    {title:'Sneakers', brand:'Puma', price:'$10', size:8, quantity:2}
  ];
  let link = purpose==='wishlist' ?<MoveToCartLink /> : <MoveToWishlistLink />;
  let button = purpose==='wishlist'?<MoveAllToCart/> : <Buy/>;
  let productsList = <Empty />
  if(products.length){
    productsList = products.map(product=>
      (<Product key={product.title} {...product} link={link}/>));
    productsList.push(button);
  }
  return <Flex direction='column' width='fit-content' style={{gap:30}} p='1rem 0 0 1rem'>
  <Heading>{capitalise(purpose)}</Heading>
  {productsList}
  </Flex>
}

function Product({title, brand, price, size, quantity, link}){
  return <Grid templateColumns='auto auto' columnGap={5}>
    <Image gridRow='span 5' minHeight={150} minWidth={150}>
    </Image>
    <Heading as='h1' gridColumnStart={2} m={0} size='md'>{title}</Heading>
    <Heading as='h2' gridColumnStart={2} size='sm'>{brand}</Heading>
    <Text as='strong' fontSize='sm'>{price}</Text>
    <Text><Text as='span'>Size :</Text> {size}</Text>
    <Flex gridColumnStart={2} minWidth='17rem' justifyContent='space-between' alignItems='center'>
      <NumInput type='number' min={1} value={quantity} maxWidth='5rem'/>
        {link}
      <Link>Remove</Link>
    </Flex>
  </Grid>
}
function NumInput(props){
  return (<NumberInput width='5rem' min={1} aria-label='Quantity' defaultValue={1} {...props}>
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
function MoveToCartLink(){
  return <Link>Move to cart</Link>
}
function MoveToWishlistLink(){
  return <Link>Move to wishlist</Link>
}
function MoveAllToCart(){
  return <Button>Move All to Cart</Button>
}
function Buy(){
  return <Button>Buy</Button>
}
function capitalise(str){
  return str.split(' ').map(word=>word[0].toUpperCase()+word.slice(1)).join(' ');
}
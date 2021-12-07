import { Image } from "@chakra-ui/image";
import { Badge, Grid, Heading, Text } from "@chakra-ui/layout";
import { Flex , Box} from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import {Stars} from "./Rating";
import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter, ModalHeader, ModalCloseButton} from "@chakra-ui/modal";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Textarea } from "@chakra-ui/textarea";
import {useParams} from "react-router-dom";
import axios from 'axios';
import { addToCart } from "./utils";
import { NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInputField} from "@chakra-ui/number-input";

export default function ProductPage({incrementCartCount}){
  let {title} = useParams(); 
  let [description, setDescription] = useState('');
  let [reviews, setReviews] = useState([]);
  let [rating, setRating] = useState(5);
  let [numReviews,setNumReviews] = useState(0);
  // eslint-disable-next-line no-unused-vars
  let [images,setImages] = useState([]);
  let [_id, set_id] = useState('');
  let [quantity, setQuantity] = useState(1);
  let [inCart, setInCart] = useState(false);
  useEffect(function(){
    async function fetchProductData(){
      let response = await axios.get(`http://localhost:3001/products/${encodeURI(title)}`);
      setDescription(response.data.product_desc);
      setRating(response.data.product_rating);
      setNumReviews(response.data.product_num_of_reviews);
      set_id(response.data._id);
      setReviews((await axios.get(`http://localhost:3001/reviews/${response.data._id}`)).data);
    }
    fetchProductData();
  },[title]);
  return (
    <Grid templateColumns='1fr 1fr'>
    <ProductImages images={images} />
    <Box p={4} gridColumn={{base:'span 2',lg:'span 1'}}>
      <Heading mb={2}>{title}</Heading>
      <Heading size='md'>$50</Heading>
      <Rating rating={rating} numReviews={numReviews}/>
      <Text my={5}>
        {description}
      </Text>
      <QuantityInput onChange={setQuantity} value={quantity}/>
      <Button my={4} width='100%' onClick={()=>addToCart(_id, quantity).then(setInCart(true)).then(incrementCartCount())} colorScheme={inCart ? 'gray': 'pink'}>Add{inCart ? 'ed' : ''} to Cart</Button>
    </Box>
    <Heading px={4} mt={5} gridColumn='span 2'>Reviews</Heading>
    <Reviews reviews={reviews} _id={_id} addReview={(review)=>setReviews(reviews.slice().concat([review]))}/>
    </Grid>
  );
}

function ProductImages({images}){
  let [mainSrc, showImage] = useState(images[0]?.src || 'Some "No image" image url here');
  let [mainAlt, setAlt] = useState(images[0]?.alt || 'No images of this product');
  let changeMain = ({src,alt})=>{
    showImage(src);
    setAlt(alt);
  }
  return (<Box p={4} gridColumn={{base:'span 2',lg:'span 1'}}>
    <MainImage src={mainSrc} alt={mainAlt} />
    <Thumbnails images={images} changeMain={changeMain} />
  </Box>)

  function MainImage({src,alt}){
    return <Image src={src} alt={alt} />
  }
  function Thumbnails({images,changeMain}){
    return (<Flex pt={1} style={{gap:'1rem'}}>
    {images.map((image,i)=>(
      <IconButton onClick={()=>changeMain({...image})} icon={<Image key={image.src} src={image.src} alt={image.alt} height='100%'/>} /> 
      ))}
    </Flex>); 
  }
}

function QuantityInput(props){
  return (
  <Flex style={{gap:'1rem'}} alignItems='center'>
  <Text>Quantity</Text>
  <NumInput {...props}/>
  </Flex>);
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

function Review({title,product_rating,username,isVerified,review_text}){
  return (<Box mb={4}>
    <Heading size='sm'>{title}</Heading>
    <Flex><Stars rating={product_rating} /></Flex>
    <Text>{review_text}</Text>
    <Text as='cite'>{username} 
    {isVerified?<Badge>Verified User</Badge>:''}
    </Text>
  </Box>);
}
function Reviews({reviews,_id, addReview}){
  return (
  <Box p={4}>
  <ReviewModal _id={_id} addReview={addReview}></ReviewModal>
  {reviews.map(review=><Review {...review} />)}
  </Box>);
}
function ReviewModal({_id, addReview}){
  const {isOpen, onOpen, onClose} = useDisclosure();
  let [rating,setRating] = useState(5);
  let [details, setDetails] = useState('');
  let [title, setTitle] = useState('');
  return (
    <React.Fragment>
      <Button onClick={onOpen}>Leave a review</Button>
      <Modal
        initialFocus
        finalFocus
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave a review</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input  placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Rating</FormLabel>
              <NumInput max={5} min={1} onChange={setRating} value={rating}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Details</FormLabel>
              <Textarea placeholder="" onChange={(e)=>setDetails(e.target.value)} value={details}/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=>postReview()}>
              Post
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
  async function postReview(){
    try{
    let response = (await axios.get('http://localhost:3001/reviews/add/'+_id,{
      withCredentials : true,
      params : {
        title : title,
        product_rating : rating, 
        review_text : details
      }
    }));
    addReview(response.data);
  }
  catch(e){
    alert('You\'re not logged in');
  }
  onClose();
  }
}
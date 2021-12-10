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
import { Spinner } from "@chakra-ui/spinner";

export default function ProductPage({incrementCartCount}){
  let {title} = useParams(); 
  let [description, setDescription] = useState('');
  let [reviews, setReviews] = useState([]);
  let [rating, setRating] = useState(5);
  let [numReviews,setNumReviews] = useState(0);
  let [cost, setCost] = useState(50);
  // eslint-disable-next-line no-unused-vars
  let [imageComponent,setImageComponent] = useState(<Spinner />);
  let [_id, set_id] = useState('');
  let [quantity, setQuantity] = useState(1);
  let [inCart, setInCart] = useState(false);
  useEffect(function(){
    async function fetchProductData(){
      let response = await axios.get(`http://localhost:3001/products/${encodeURI(title)}`);
      setDescription(response.data.product_desc);
      setRating(response.data.product_rating);
      setNumReviews(response.data.product_num_of_reviews);
      setImageComponent(<ProductImages images={response.data.product_images} />);
      console.log(response.data);
      set_id(response.data._id);
      setCost(response.data.product_cost);
      setReviews((await axios.get(`http://localhost:3001/reviews/${response.data._id}`)).data);
    }
    fetchProductData();
  },[title]);
  return (
    <Grid templateColumns='1fr 1fr'>
    {imageComponent}
    <Box p={4} gridColumn={{base:'span 2',lg:'span 1'}}>
      <Heading mb={2}>{title}</Heading>
      <Heading size='md'>${cost}</Heading>
      <Rating rating={rating} numReviews={numReviews}/>
      <Text my={5}>
        {description}
      </Text>
      <QuantityInput onChange={setQuantity} value={quantity}/>
      <Button my={4} width='100%' onClick={()=>addToCart(_id, quantity).then(setInCart(true)).then(incrementCartCount())} colorScheme={inCart ? 'gray': 'pink'}>Add{inCart ? 'ed' : ''} to Cart</Button>
      <Heading mt={5} gridColumn='span 2'>Reviews</Heading>
      <Reviews reviews={reviews} _id={_id} addReview={(review)=>setReviews(reviews.slice().concat([review]))}/>
    </Box>
    </Grid>
  );
}

function ProductImages({images}){
  let [mainSrc, showImage] = useState(images[0]?.url || 'Some "No image" image url here');
  let [mainAlt, setAlt] = useState(images[0]?.alt || 'No images of this product');

  let changeMain = ({url,alt})=>{
    showImage(url);
    setAlt(alt);
  }
  return (<Box p={4} gridColumn={{base:'span 2',lg:'span 1'}}>
    <Image src={mainSrc} alt={mainAlt} maxW='30rem'/>
    <Thumbnails images={images} changeMain={changeMain} />
  </Box>) 


  function Thumbnails({images,changeMain}){
    return (<Flex pt={1} style={{gap:'1rem'}}>
    {images.map((image,i)=>(
      <IconButton key={image.url} onClick={()=>changeMain({...image})} icon={<Image key={image.src} src={image.url} alt={image.alt} height='100%'/>} /> 
      ))
    }
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
  <Box py={4}>
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
      <Button onClick={onOpen} mb={5}>Leave a review</Button>
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
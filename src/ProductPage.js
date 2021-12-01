import { Image } from "@chakra-ui/image";
import { Badge, Grid, Heading, Text } from "@chakra-ui/layout";
import { Flex , Box} from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { useEffect, useState } from "react";
import Rating from "./Rating";
import {Stars} from "./Rating";
import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter, ModalHeader, ModalCloseButton} from "@chakra-ui/modal";
import { FormControl } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { Textarea } from "@chakra-ui/textarea";
import {useParams} from "react-router-dom";
import axios from 'axios';
import {
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react"
import { NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInputField} from "@chakra-ui/number-input";

const testReviews = [
  {title : 'Excellent Product',
   rating: 5, 
   user : 'Ashley Smith', 
   verified: false, 
   text: 'I enjoyed this oil a lot'},
  {title : 'Took my depression away',
   rating : 5,
   user : 'Bill Gates',
   verified : true,
   text : 'Buy this'
  },
  {title : 'very pretty and efficient',
   rating : 4.5,
   user : 'Elon',
   verified : true,
   text : 'Must buy'
  }
];
let products = {
  'iPhone':{
    title : 'iPhone 13',
    rating : 4.5,
    images : [
      {src : 'https://tse3.mm.bing.net/th?id=OIP.IumWkT1hfQ3DbUZJ47fYiQHaFj&pid=Api', alt:'An image'},
      {src : 'https://tse4.mm.bing.net/th?id=OIP.rvSWtRd_oPRTwDoTCmkP5gHaE8&pid=Api', alt:'A peaceful image '}
    ], 
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam officiis temporibus minus veniam ratione aperiam architecto doloribus obcaecati? Ipsa, aliquid quas animi nihil illo tenetur quis quod saepe fuga sapiente nulla sequi atque id culpa aspernatur provident repudiandae porro sunt?",
    specifications : {
      "made in " : "china",
      "color"    : "rose gold",
      "edible "  : "no"
    },
    reviews : testReviews
  }
}
export default function ProductPage(){
  let {title} = useParams(); 
  let [description, setDescription] = useState('');
  let [reviews, setReviews] = useState([]);
  let [specifications, setSpecifications] = useState({});
  let [rating, setRating] = useState(5);
  let [numReviews,setNumReviews] = useState(0);
  let [images,setImages] = useState([]);
  useEffect(async function(){ // calls the function when the component is mounted
    let response = await axios.get(`http://localhost:3001/products/${encodeURI(title)}`);
    setDescription(response.data.product_desc);
    setRating(response.data.product_rating);
    setNumReviews(response.data.product_num_of_reviews);
    fetchReviews(response.data._id);
  },[]);
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
      <QuantityInput />
      <Button my={4} width='100%'>Add to Cart</Button>
    </Box>
    <Heading p={4}>Specifications</Heading>
    <SpecsTable specifications={specifications}/>
    <Heading px={4} mt={5} gridColumn='span 2'>Reviews</Heading>
    <Reviews reviews={reviews} />
    </Grid>
  );

  async function fetchReviews(_id){
    let response = await axios.get(`http://localhost:3001/reviews/${_id}`);
    setReviews(response.data);
  }
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

function QuantityInput(){
  return (
  <Flex style={{gap:'1rem'}} alignItems='center'>
  <Text>Quantity</Text>
  <NumInput />
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
function SpecsTable({specifications}){
  return (<Table variant="simple" colorScheme="gray " gridColumn='span 2'>
  <Tbody>
    {Object.keys(specifications).map(key=>{
      return (<Tr>
        <Td>{key}</Td>
        <Td>{specifications[key]}</Td>
      </Tr>)
    })}
  </Tbody>
</Table>);
}

function Review({title,rating,user,verified,text}){
  return (<Box mb={4}>
    <Heading size='sm'>{title}</Heading>
    <Flex><Stars rating={rating} /></Flex>
    <Text>{text}</Text>
    <Text as='cite'>{user} 
    {verified?<Badge>Verified User</Badge>:''}
    </Text>
  </Box>);
}
function Reviews({reviews}){
  return (
  <Box p={4}>
  {reviews.map(review=><Review {...review} />)}
  <ReviewModal></ReviewModal>
  </Box>);
}
function ReviewModal(){
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <>
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
              <Input  placeholder="Title" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Rating</FormLabel>
              <NumInput max={5} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Details</FormLabel>
              <Textarea placeholder="" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Post
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
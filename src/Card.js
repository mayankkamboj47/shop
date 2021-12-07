import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  chakra,
  Tooltip,
} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/button';
import { faHeart, faShoppingCart  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkBox, LinkOverlay} from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/layout';
import Rating from './Rating';
import { addToCart, addToWishlist } from './utils';

function Card({title,
   imageURL = 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
   name = 'Wayfarer Classic', 
   price = 4.5, 
   rating = 4.3, 
   numReviews = 34,
   _id} = {}) {
  return (
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        borderWidth="1px"
        rounded="sm"
        shadow="sm"
        position="relative"
        maxW='20rem'
        >
        {<IconButton icon={
          <FontAwesomeIcon icon={faHeart} />
        } aria-label='Add to wishlist' position='absolute' top={2} right={2}
        onClick={
        (e)=>{
          e.preventDefault();
          e.stopPropagation();
          addToWishlist(_id);
        }
        }/>}
        <Image
          src={imageURL}
          alt={`Picture of ${name}`}
          roundedTop="sm" 
        />
        <LinkBox>
        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
          <LinkOverlay href={`/p/${title}`}>
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              maxW='15rem'
              >
              {name}
            </Box>
            </LinkOverlay>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={'top'}
              color={'gray.800'}
              fontSize={'1.2em'}>
              <chakra.a href={'#'} display={'flex'} onClick={async (e)=>{
                e.preventDefault();
                alert('Heyo');
                // for some reason, post await is not working. Do one thing, make frontend changes before only, and hope things are alright. If they go wrong, add a catch statement here and hope it
                // catches stuff. 
                await addToCart(_id);
              }}>
              <FontAwesomeIcon icon={faShoppingCart} />
              </chakra.a>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={rating} numReviews={numReviews}  />
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              <Box as="span" color={'gray.600'} fontSize="lg">
                £
              </Box>
              {price.toFixed(2)}
            </Box>
          </Flex>
        </Box>
        </LinkBox>
      </Box>
  );
}

export default Card;

export function OrderCard({title,
  imageURL = 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name = 'Wayfarer Classic', 
  price = 4.5, 
  rating = 4.3, 
  numReviews = 34} = {}){
  return (
    <LinkBox>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        borderWidth="1px"
        rounded="sm"
        shadow="sm"
        position="relative"
        maxWidth='20rem'
        >
        <Image
          src={imageURL}
          alt={`Picture of ${name}`}
          roundedTop="sm" 
        />
        <Box p="6" pb='0'>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
          <LinkOverlay href='/p/sampleProduct'>
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated>
              {name}
            </Box>
            </LinkOverlay>
            <Box as="span" color={'gray.600'} fontSize="lg">
            £    {price.toFixed(2)}

          </Box>
          </Flex>
        </Box>
        <Box p={6} pt={3}>
        21 Jan 2021
        </Box>
      </Box>
      </LinkBox>);
}

export function CategoryCard({title,image}) {
  return (
    <LinkBox>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={image}
          />
        </Box>
        <LinkOverlay href={`/c/${title.toLowerCase()}`}>
        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} align='center' p='2rem 0 1rem'>
        {title}
        </Heading>
        </LinkOverlay>
      </Box>
      </LinkBox>
  );
}
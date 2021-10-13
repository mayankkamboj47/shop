import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  chakra,
  Tooltip,
} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/button';
import ShoppingCart from './assets/shopping_bag_black_24dp.svg'
import Heart from './assets/favorite_black_24dp.svg'
import { LinkBox, LinkOverlay} from '@chakra-ui/layout';
import Rating from './Rating';
const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'Wayfarer Classic',
  price: 4.5,
  rating: 4.3,
  numReviews: 34,
};

function Card() {
  return (
    <LinkBox>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        borderWidth="1px"
        rounded="sm"
        shadow="sm"
        position="relative">
        {<IconButton icon={
          <Image src={Heart} />
        } aria-label='Add to wishlist' position='absolute' top={2} right={2}/>}
        <Image
          src={data.imageURL}
          alt={`Picture of ${data.name}`}
          roundedTop="sm" 
        />

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
          <LinkOverlay href='/p/sampleProduct'>
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated>
              {data.name}
            </Box>
            </LinkOverlay>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={'top'}
              color={'gray.800'}
              fontSize={'1.2em'}>
              <chakra.a href={'#'} display={'flex'}>
                <img src={ShoppingCart} alt=''/>
              </chakra.a>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={data.rating} numReviews={data.numReviews}  />
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              <Box as="span" color={'gray.600'} fontSize="lg">
                £
              </Box>
              {data.price.toFixed(2)}
            </Box>
          </Flex>
        </Box>
      </Box>
      </LinkBox>
  );
}

export default Card;

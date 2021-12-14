import Flickity from './Flickity';
import { Heading, SimpleGrid } from '@chakra-ui/layout';
import {CategoryCard} from './Card';
import React from 'react';
import FilterableProducts from './FilterableProducts';
import { Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
export default function Home({incrementCartCount}){
  let carouselStyles = {
    'newArrivals' : {
      background : 'url(https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260), linear-gradient(to bottom, #d6dae3,#d5d9e2,#d8dce5,#d3d7e0, #d6dce3)',
      backgroundSize : 'auto 150%',
      backgroundRepeat : 'no-repeat',
      backgroundPosition : 'right center'
    },
    'blacks' : {
      background : 'url("https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260") black',
      backgroundSize : 'cover'
    }
  }
  return (
    <React.Fragment>
    <Flex p='1rem'>
      <Link to='/about' style={{'margin-right':'3rem'}}>
      About
      </Link>
      <Link to='/contact'>
      Contact
      </Link>
      <Link to='/signup' style={{'margin-left':'auto'}}>
      Sign up
      </Link>
    </Flex>
      <Flickity options={{wrapAround:true}} className={'main-carousel'} >
        <div className='carousel-cell' style={carouselStyles.newArrivals}>
          <Heading size='4xl' m='6rem 0 0 6rem' bgGradient='linear(to-r,#EB5757,black 80%)' bgClip={'text'}>New Arrivals</Heading>
        </div>
        <div className='carousel-cell' style={carouselStyles.blacks}> 
          <Heading size='4xl' m='6rem 0 0 6rem' bgGradient='linear(to-r,#E8CBC0,#636FA4)' bgClip={'text'}>Finest blacks</Heading>
        </div>
      </Flickity>
      <Heading p={4}>Categories</Heading>
      <SimpleGrid minChildWidth='300px' spacing='3rem' p='2rem 0'>
      <CategoryCard image='https://res.cloudinary.com/dl6m7txan/image/upload/v1602429759/3_nhmz6u.jpg'
       title='Black'/>
       <CategoryCard image='https://res.cloudinary.com/dl6m7txan/image/upload/v1602429779/41_zoo1yo.jpg'
       title='Formal'/>
       <CategoryCard image='https://res.cloudinary.com/dl6m7txan/image/upload/v1602429777/27_htd76r.jpg'
       title='Summer'/>
       <CategoryCard image='https://res.cloudinary.com/dl6m7txan/image/upload/v1602429778/30_lfhthy.jpg'
       title='Jacket'/>

       </SimpleGrid>
       <Heading p={4}>Products</Heading>
       <FilterableProducts dataSource='http://localhost:3001/products' incrementCartCount={incrementCartCount}/>
      </React.Fragment>
    );
}
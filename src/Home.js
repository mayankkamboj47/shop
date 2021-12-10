import Flickity from './Flickity';
import { Heading, SimpleGrid } from '@chakra-ui/layout';
import {CategoryCard} from './Card';
import React from 'react';
import FilterableProducts from './FilterableProducts';
export default function Home({incrementCartCount}){
  return (
    <React.Fragment>
      <Flickity options={{wrapAround:true}} className={'main-carousel'} >
        <div className='carousel-cell'>
        1
        </div>
        <div className='carousel-cell'>
          2
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
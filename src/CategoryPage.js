import Flickity from './Flickity';
import './css/carousel.css';
import Card from './Card';
import { SimpleGrid } from '@chakra-ui/layout';
import React from 'react';
import FilterBar from './FilterBar';
export default function CategoryPage(){
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
       <FilterBar />
      <SimpleGrid minChildWidth='300px' spacing='3rem'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </SimpleGrid>
      </React.Fragment>
    ); 
}
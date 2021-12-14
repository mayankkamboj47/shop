import Flickity from './Flickity';
import './css/carousel.css';
import React from 'react';
import {useParams} from 'react-router-dom';
import FilterableProducts from './FilterableProducts';
import { Heading } from '@chakra-ui/react';

export default function CategoryPage({incrementCartCount}){
  let {category} = useParams();
  let backgrounds = [
    'linear-gradient(#DBE6F6,#C5796D)',
    'linear-gradient(#3494E6,#EC6EAD)',
    'linear-gradient(#F3904F,#3B4371)',
    'linear-gradient(#A770EF,#CF8BF3,#FDB99B)',
    'linear-gradient(#4ECDC4,#556270)',
    'linear-gradient(#42275A,#764B6D)',
    'linear-gradient(#2C3E50, #FD746C)'
  ];
  let carouselLabels = {
    'formal' : ['Make a statement', 'Look smart'],
    'black'  : ['Back to black', 'Simple and elegant blacks'],
    'summer' : ['Look hot and happening', 'Fun and comfy'],
    'jacket' : ['Winter is here','Jackets shackets and more']
  }
  return (
    <React.Fragment>
      <Flickity options={{wrapAround:true}} className={'main-carousel'} >
        <div className='carousel-cell' style={{background:pickRandom(backgrounds)}}>
          <Heading size='4xl' textAlign='center' mt='5rem'>{carouselLabels[category][0]}</Heading>
        </div>
        <div className='carousel-cell' style={{background:pickRandom(backgrounds)}}>
        <Heading size='4xl' textAlign='center' mt='5rem'>{carouselLabels[category][1]}</Heading>
        </div>
      </Flickity>
      <FilterableProducts dataSource={'http://localhost:3001/products/category/'+category} incrementCartCount={incrementCartCount}/>
      </React.Fragment>
    ); 
}

function pickRandom(array){
  return array[Math.floor(Math.random()*array.length)];
}
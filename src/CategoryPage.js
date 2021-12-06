import Flickity from './Flickity';
import './css/carousel.css';
import React from 'react';
import {useParams} from 'react-router-dom';
import FilterableProducts from './FilterableProducts';

export default function CategoryPage(){
  let {category} = useParams();
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
      <FilterableProducts dataSource={'http://localhost:3001/products/category/'+category} />
      </React.Fragment>
    ); 
}
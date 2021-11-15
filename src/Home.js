import Flickity from './Flickity';
import Card from './Card';
import { Heading, SimpleGrid } from '@chakra-ui/layout';
import {CategoryCard} from './Card';
import React from 'react';
import FilterBar from './FilterBar';

export default function Home(){
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
      <CategoryCard image='https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
       title='Chairs'/>
       <CategoryCard image='https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
       title='Books'/>
       <CategoryCard image='https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
       title='Clothes'/>
       <CategoryCard image='https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
       title='Games'/>
       <CategoryCard image='https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
       title='Movies' />
       </SimpleGrid>
       <Heading p={4}>Products</Heading>
       <FilterBar />
      <SimpleGrid minChildWidth='300px' spacing='3rem'>
        <Card title='iPhone'/>
        <Card title='iPhone'/>
        <Card title='iPhone'/>
        <Card title='iPhone'/>
        <Card title='iPhone'/>
        <Card title='iPhone'/>
      </SimpleGrid>
      </React.Fragment>
    );
}
import React from 'react'
import LayOut from '../../LayOut/LayOut';
import Carousel from '../../../Carouesl/Carousel';
import Category from '../../Category/Category';
import Product from '../../Product/Product';

const Landing = () => {
  return (
    <LayOut>
      
      <Carousel />
      <Category />
      <Product/>
    </LayOut>
  );
}

export default Landing

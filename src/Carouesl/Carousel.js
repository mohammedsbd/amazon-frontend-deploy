import React from 'react'
import { Carousel } from "react-responsive-carousel";
import {img} from "./img/Data"

const CarouselEffect = () => {
  return (
    <div>
      <Carousel autoPlay={true}
      infinteLoop={true}
      showIndicators={false}
      showThumbs={false}>

{
img.map((imageItemLink)=>{
  return <img key={imageItemLink} src={imageItemLink}/>
})
}

      </Carousel>
      <div className='hero__img'>
        
      </div>
    </div>
  )
}

export default CarouselEffect

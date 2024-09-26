import { useState,useEffect } from "react";
import "./productdetail.css"
import LayOut from '../../LayOut/LayOut'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../../Api/endPoints';
import ProductCard from '../../Product/ProductCard';
import Loader from '../../Loader/Loader';

function ProductDetali() {
  const {productId}=useParams()
  const [product, setProduct] = useState({})
  const [isLoading, setisLoading] = useState(false)

  
  useEffect(() => {
    setisLoading(true)
   axios.get(`${productUrl}/products/${productId}`)
   .then((res)=>{
setProduct(res.data)
setisLoading(false)
// console.log(res.data);
  
}).catch((err)=>{
console.log(err);
setisLoading(false)
   })
  }, [])
  console.log(product);
  
  return (
    <LayOut>
      {isLoading ? (<Loader />) : (<ProductCard product={product} flex={true} renderDesc={true}
      renderAdd={true}/>)}
      <div></div>
    </LayOut>
  );
}

export default ProductDetali

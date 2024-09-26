
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import { Rating } from '@mui/material';
import  './product.css'
import { Link } from 'react-router-dom'
import { useContext, useEffect,useState } from 'react';
import { DataContext } from '../DataProvider/DataProvider';
import {Type} from "../../Utility/action.type"


function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price , description} = product;
  //  Destructring 
  
  
  const [state,dispatch]=useContext(DataContext)

 const addToCart = () => {
   dispatch({
     type: Type.ADD_TO_BASKET,
     item: {
       image,
       title,
       id,
       rating,
       price,
       description,
     },
   });
 };
  
  
  
  
  
  
  
  
  
  


 return (
    <div
      className={`card_container ${
        flex ? 'product__flexed' : "hover"
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" className="img_container" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ width: "500px" }}>{description}</div>}
        <div className="rating">
          <Rating  readOnly  value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>

        {renderAdd && (
          
          <button className="button" onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

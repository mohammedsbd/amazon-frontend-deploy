import React, { useState ,useEffect} from 'react'
import "./results.css"
import LayOut from '../../LayOut/LayOut'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../../Api/endPoints'; 
import ProductCard from '../../Product/ProductCard';
import Loader from '../../Loader/Loader';


function Results() {
  const [results, setResults] = useState([]);
  const [isLoading,setisLoading]=useState()
  const { categoryName } = useParams();

  useEffect(() => {
    console.log(categoryName);

    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        console.log(res);
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        
        <hr />
        {isLoading ? (
          <Loader />
        ) : (


          <div className="products_container">
            {results?.map((product) => (
              <ProductCard 
              key={product.id} 
              renderAdd={true} 
              product={product}
              renderDesc={false} />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
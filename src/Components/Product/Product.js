import { useState,useEffect} from "react"
import ProductCard from "./ProductCard"
import Loader from "../Loader/Loader";
import axios from "axios";
import './product.css'

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading,setisLoading]=useState(false)

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        // isLoading(false)
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        // isLoading(false)
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="products__flexed">
          {products?.map((singleProduct) => {
            return (
              
              <ProductCard
                renderAdd={true}
                product={singleProduct}
                key={singleProduct.id}
              />
            );
          })}
        </section>
      )}
    </>
  );
};

export default Product;

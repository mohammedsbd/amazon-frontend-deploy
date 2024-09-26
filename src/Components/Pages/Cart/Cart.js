
import { useContext } from 'react';
import { DataContext } from '../../DataProvider/DataProvider';
import "./cart.css"
import LayOut from '../../LayOut/LayOut'
import ProductCard from '../../Product/ProductCard';
import CurrencyFormat from '../../CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import { Type } from '../../../Utility/action.type';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// import { type } from '@testing-library/user-event/dist/type';


function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  // console.log(basket)

  // const total=basket.reduce((amount,item)=>{
  //    return item.price * item.amount + amount
  // } ,0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

    return (
      <LayOut>
       <section className='container'>
        <div className='cart__container'>
          <h2>Hello</h2>
          <h3>This Is Your shopping Basket</h3>
          <hr/>
          {
            basket?.length==0?(<p>Opps ! No Item in your Cart</p>):(

              basket?.map((item,i)=>(
                <section className="cart__product">
                  <ProductCard
                    renderAdd={false}
                    key={i}
                    product={item}
                    renderDesc={true}
                    flex={true} />
                  <div className="btn__container">
                    <button className="btn" onClick={() => increment(item)}>
                      <ArrowUpwardIcon />

                    </button>
                    <span>{item.amount}</span>
                    <button className="btn" onClick={() => decrement(item.id)}>
                      <ArrowDownwardIcon size={23}/>
                    </button>
                  </div>
                </section>
              ))
            )
          }
        </div>

  {
    basket?.length !==0&&(
   <div className='subtotal'>
    <div>
      <p>SubTotal ({basket?.length} items)</p>

      <CurrencyFormat
      amount={total}
      decimalScale={2}
      displatType={"text"}/>
    </div>
    <span>
      <input type='checkbox'/>
      <small>This Order Contains A Gift</small>
    </span>
    <Link to="/payments">Continue To Checkout</Link>
   </div>

    )
  }

       </section>
      </LayOut>
    );
  }

  export default Cart

 
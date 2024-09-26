import React, { useContext, useState } from "react";
import "./payment.css";
import { DataContext } from "../../DataProvider/DataProvider";
import LayOut from "../../LayOut/LayOut";
import ProductCard from "../../Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { ClipLoader } from "react-spinners";
import { Link, Navigate } from "react-router-dom";
import CurrencyFormat from "../../CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../../Api/axios";
import { useNavigate } from "react-router-dom";
import { Type } from "../../../Utility/action.type";
import { db } from "../../../Utility/firebase";


function Payment() {
  const [{ user, basket },dispatch] = useContext(DataContext);
  console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate();


  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1 backend || functions ---> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);

      // error client secret is not giving in the console

      const clientSecret = response.data?.clientSecret;

      // 2 client side react side confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(paymentIntent);
      // 3 after the confirmation ---> under firestore database save, clear basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        // empty the basket

dispatch({type:Type.EMPTY_BASKET})

      
      
        setProcessing(false);

        navigate("/orders",{state:{msg:"you have placed a new order"  }})
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className="payment__header"> Checkout ({totalItem}) items</div>

      {/* payment section */}

      <section className="payment">
        {/* adress */}
        <div className="flex">
          <h3>Delivery Adress</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 react lane</div>
            <div>Ethiopia .AA</div>
          </div>
        </div>
        <hr />

        {/* product */}

        <div className="flex">
          <h3> Review Items And Delivery</h3>
          <div style={{maxWidth:"700px"}}>
            
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className="flex">
          <h3>Payment Methods</h3>
          <div className="payment__card__container">
            <div className="payment__details">
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className="payment__price">
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className="loading">
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;

import React, { useContext, useState, useEffect } from "react";
import "./order.css";
import LayOut from "../../LayOut/LayOut";
import { db } from "../../../Utility/firebase";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductCard from "../../Product/ProductCard";

function Order() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]); // Add user as a dependency

  return (
    <LayOut>
      <section className="containerss">
        <div className="orderss__container">
          <h2>Your Orders</h2>

          {/* Display a message when the user has no orders */}
          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>You Don't Have Any Orders.</div>
          )}

          {/* Orders items */}
          <div>
            {orders?.map((eachOrder, i) => (
              <div key={i} style={{ width: "900px" }}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard flex={true} product={order} key={order.id} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Order;


import {BrowserRouter as Router, Routes ,Route} from "react-router-dom"
import Landing from './Components/Pages/Landing/Landing'
import SignUp from './Components/Pages/Auth/Auth'
import Order from './Components/Pages/Orders/Order'
import Payment from './Components/Pages/Payment/Payment'
import Cart from './Components/Pages/Cart/Cart'
import Results from './Components/Pages/Results/Results'
import ProductDetali from './Components/Pages/ProductDetail/ProductDetali'
import Auth from "./Components/Pages/Auth/Auth"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
const stripePromise = loadStripe(
  "pk_test_51Q1pcb1xbwP5ZhMZ2L9tpElveUaDWkYqOlJyZfOaVr7AvxpCG2qNI02hpdD17HiM35Qc6uNJE6dXR13cvkiBjz5f00XNf4VqcL"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="auth" element={<Auth />} />
        <Route
          path="payments"
          element={
            <ProtectedRoute
              msg={"you must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you must log in to access your orders"}
              redirect={"/orders"}
            >
              <Order />
            </ProtectedRoute>
          }
        />
        <Route path="category/:categoryName" element={<Results />} />
        <Route path="products/:productId" element={<ProductDetali />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;

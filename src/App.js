
// import { Carousel } from 'react-responsive-carousel';
import './App.css';
import Header from './Components/Header/Header';
import Carousel from './Carouesl/Carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Category from './Components/Category/Category';
import Routing from './Router';
import AmazonFooter from './Components/Footer/Footer';
import { useContext, useEffect } from 'react';
import { DataContext } from './Components/DataProvider/DataProvider';
import {auth} from "./Utility/firebase"
import { Type } from './Utility/action.type';



function App() {
const [{user} , dispatch]=useContext(DataContext)




  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return (


<div>


{/* <Header/>
<Carousel/>
<Category/> */}

<Routing/>
{/* <AmazonFooter/> */}
{/* <Footer/> */}
</div>
  );
}

export default App;

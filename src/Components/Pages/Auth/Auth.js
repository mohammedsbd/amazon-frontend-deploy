import React, { useState ,useContext} from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import "./signup.css"
import {auth} from "../../../Utility/firebase"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {DataContext} from "../../DataProvider/DataProvider"
import { Type } from '../../../Utility/action.type';
import { ClipLoader } from 'react-spinners';

const Auth = () => {

  // first create your state
const [email,setEmail]=useState("");
const [password,setPassword]=useState("")
const [error,setError]=useState("")
const [loading,setLoading]=useState({
  signIn:false,
  signUp:false
})

const [{user}, dispatch]=useContext(DataContext)
const navigate=useNavigate()
const navStateData=useLocation()
console.log(navStateData)

// console.log(user);

const authHandler=async(e)=>{
  e.preventDefault()
  console.log(e.target.name);
  if(e.target.name=="signin"){
    //firebase auth means i have this user so sign in
    setLoading({...loading, signIn:true})
    signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
      // console.log(userInfo);
      dispatch({
        type: Type.SET_USER,
        user: userInfo.user
      })
      setLoading({...loading,signIn:false})
      navigate(navStateData?.state?.redirect || "/")
    }).catch((err)=>{
      setError(err.message)
       setLoading({ ...loading, signIn: false });
    })

  }else{
     setLoading({ ...loading, signUP: true });
    createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        // console.log(userInfo);
        
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
           setLoading({ ...loading, signUP: false });
           navigate(navStateData?.state?.redirect || "/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message)
         setLoading({ ...loading, signUP: false });
      });

  }

};


// console.log(password,email);
  return (
    <section className="login">
      {/* logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      {/* form */}
      <div className="login__container">
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWieght: "bold",
            }}
          >{navStateData?.state?.msg}</small>
        )}

        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className="login__signInButton"
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions Of Use &
          Sale.Please See Our Privacy Notice,Our Cookies Notices And Our
          Interest-Based Ads Notice.
        </p>

        {/* create account btn */}
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className="login__reigsterButton"
        >
          {loading.signUP ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            " Create Your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;

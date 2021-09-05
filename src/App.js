import React, { useEffect } from 'react';
import './App.css';
import Header from "./Components/Header";
import Home from "./Components/Home";
import Basket from "./Components/Basket";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Orders from "./Components/Orders";
import Checkout from "./Components/Checkout";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./features/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const promise = loadStripe('pk_test_51JRvZgBB7TaVdvcQDvxDZFupVKlPGNRql9FV1z9bJDRVjNDRQ2iVp5UGHMuvdUHPvyuaWgLeNDm41m5v7q3uq4s300TVgBoLf1');

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        dispatch(setUser(user))
      } else {
        dispatch(setUser(null))
        // console.log("No user is here")
      }
    })
  })

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/checkout">
            <Elements stripe={promise}>
              <Checkout />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/basket">
            <Header />  
            <Basket />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

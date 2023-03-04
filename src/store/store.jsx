
import { Outlet } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import "./store.css";
import TheFooter from "../footer";
import Embed from "../main-web-components/embed";
import StoreHead from "./store-head";
import StoreNavBar from "../store/navbar";
import StoreHeader from "./store-header";
import StoreCarousel from "./StoreCarousel";
import Products from "./products";
import TopDeals from "./top-deals";



function Store() {
  const [currentLink, setCurrentLink] = useState(window.location.pathname.substring(1));
  let isUserLoggedIn = false;
  try {
    isUserLoggedIn = JSON.parse(localStorage.getItem("user"));
    if (isUserLoggedIn && isUserLoggedIn.id) {
      // do nothing, continue lang
    } else {
      localStorage.clear();
      window.location.href = "http://localhost:3000/login";
    }
  } catch (error) {
    localStorage.clear();
    window.location.href = "http://localhost:3000/login";
  }

  if(currentLink === "store"){
    return !!isUserLoggedIn ? (
      <>
        <StoreHead/>
        <StoreHeader/>
        <StoreNavBar setCurrentLink = {setCurrentLink} />
        <StoreCarousel/>
        <Products/>
        <TopDeals/>
        <Embed/>
        <Outlet />
        <TheFooter/>
      </>
    ) : (
      <></>
    );
  }
  
  else{
    return !!isUserLoggedIn ? (
      <>
        <StoreHead/>
        <StoreHeader/>
        <StoreNavBar setCurrentLink = {setCurrentLink} />
        <Outlet />
        <TheFooter/>
      </>
    ) : (
      <></>
    );
  }
  
  
}

export default Store;
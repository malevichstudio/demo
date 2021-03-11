import React from "react";
import Loader from "../Loader";

const LoaderWrap = ({ children, loading }) => {
  if(loading){
    return <Loader />
  }
  return <>
    {children}
  </>
}

export default LoaderWrap;
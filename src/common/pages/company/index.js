import React from "react";
import { useSelector } from "react-redux";
import Blogger from "./Blogger";
import Advertiser from "./Advertiser";


const Company = () => {
  const { role } = useSelector(state => state.auth);
  return (
    <div>
      {
        role === "Blogger"
          ? <Blogger />
          : <Advertiser />
      }
    </div>
  )
};

export default Company;
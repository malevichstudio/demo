import React from "react";
import { useSelector } from "react-redux";
import Blogger from "./Blogger";
import Advertiser from "./Advertiser";

const Companies = () => {
  const role = useSelector(state => state.auth.role);
  return role === "Blogger" ? <Blogger /> : <Advertiser />
}

export default Companies;
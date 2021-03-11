import React from 'react';
import Logo from "../../components/icons/Logo";
import useStyles from "./styles";
import Flex from "../../components/global/Flex";
import logo from "../../../assets/images/login.jpg";
import ResetForm from "./resetForm";
import OutsideLangSwitcher from "../../components/global/OutsideLangSwitcher";
import {  useSelector } from "react-redux";
import Loader from "../../components/global/Loader";

const Reset = () => {
  const classes = useStyles({
    background: logo,
  });
  const loading = useSelector(state => state.auth.loading);
  return (
    <Flex style={{ position: "relative" }} container nowrap flex spacing={0}>
      {loading && <Loader />}
      <Flex>
        <div className={classes.regWrap}>
          <div className={classes.logo}>
            <Logo />
            <OutsideLangSwitcher />
          </div>
          <ResetForm />
        </div>
      </Flex>
      <Flex grow="xs"><div className={classes.leftImg} /></Flex>
    </Flex>
  )
}

export default Reset;
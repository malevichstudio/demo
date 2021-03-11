import React from 'react';
import { useSelector } from "react-redux";
import Logo from "../../components/icons/Logo";
import useStyles from "./styles";
import Flex from "../../components/global/Flex";
import logo from "../../../assets/images/login.jpg";
import RegForm from "./regForm";
import OutsideLangSwitcher from "../../components/global/OutsideLangSwitcher";
import Loader from "../../components/global/Loader";

const Registration = () => {
  const classes = useStyles({
    background: logo,
  });
  const loading = useSelector(state => state.auth.loading);
  return (
    <Flex style={{ position: "relative" }} container center nowrap flex spacing={0}>
      {loading && <Loader />}
      <Flex>
        <div className={classes.regWrap}>
          <div className={classes.logo}>
            <Logo />
            <OutsideLangSwitcher />
          </div>
          <RegForm />
        </div>
      </Flex>
      <Flex grow="xs" className={classes.leftImgWrap}><div className={classes.leftImg} /></Flex>
    </Flex>
  )
}

export default Registration;
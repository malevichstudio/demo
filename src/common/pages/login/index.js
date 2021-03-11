import React from 'react';
import Logo from "../../components/icons/Logo";
import useStyles from "./styles";
import Flex from "../../components/global/Flex";
import logo from "../../../assets/images/login.jpg";
import AuthForm from "./authForm";
import OutsideLangSwitcher from "../../components/global/OutsideLangSwitcher";
import { useSelector } from "react-redux";
import Loader from "../../components/global/Loader";
import { Redirect } from "react-router-dom";
import routes from "../../routes";
const Login = () => {
  const classes = useStyles({
    background: logo,
  });
  const loading = useSelector(state => state.auth.loading);
  const isAuth = useSelector(state => state.auth.isAuth);
  if(isAuth){
    return <Redirect to={routes.companies} />
  }
  return (
    <Flex style={{ position: "relative" }} container nowrap flex spacing={0}>
      {loading && <Loader />}
      <Flex>
        <div className={classes.regWrap}>
          <div className={classes.logo}>
            <Logo />
            <OutsideLangSwitcher />
          </div>
          <AuthForm />
        </div>
      </Flex>
      <Flex grow="xs"><div className={classes.leftImg}/></Flex>
    </Flex>
  )
}

export default Login;
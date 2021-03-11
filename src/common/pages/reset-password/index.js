import React, {useEffect} from 'react';
import Logo from "../../components/icons/Logo";
import useStyles from "./styles";
import Flex from "../../components/global/Flex";
import logo from "../../../assets/images/login.jpg";
import ResetPasswordForm from "./resetPasswordForm";
import OutsideLangSwitcher from "../../components/global/OutsideLangSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../../../store/actions/auth";
import Loader from "../../components/global/Loader";
import {useIntl} from "react-intl";
import {NavLink} from "react-router-dom";

const ResetPassword = () => {
  const classes = useStyles({
    background: logo,
  });
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  useEffect(() => () => dispatch(refresh()));
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const isPasswordReset = useSelector(state => state.auth.isPasswordReset);
  return (
    <Flex style={{ position: "relative" }} container nowrap flex spacing={0}>
      {loading && <Loader />}
      <Flex>
        <div className={classes.regWrap}>
          <div className={classes.logo}>
            <Logo />
            <OutsideLangSwitcher />
          </div>
          {
            isPasswordReset
              ? <div className={classes.confirmMessage}>
                {
                  error
                    ? error
                    : <>
                      {formatMessage({ id: 'reset-password.message' })} <NavLink to="/">Войти</NavLink>
                    </>
                }
              </div>
              : <ResetPasswordForm />
          }
        </div>
      </Flex>
      <Flex grow="xs"><div className={classes.leftImg} /></Flex>
    </Flex>
  )
}

export default ResetPassword;
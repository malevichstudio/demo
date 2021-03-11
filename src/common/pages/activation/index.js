import React, { useEffect } from 'react';
import Logo from "../../components/icons/Logo";
import useStyles from "./styles";
import Flex from "../../components/global/Flex";
import logo from "../../../assets/images/login.jpg";
import { useIntl } from "react-intl";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activate } from "../../../store/actions/auth";
import Loader from "../../components/global/Loader";

const Activation = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const classes = useStyles({
    background: logo,
  });
  const { token } = useParams();
  useEffect(() => {
    dispatch(activate(token));
  }, []);
  return (
    <Flex style={{ position: "relative" }} container nowrap flex spacing={0}>
      {loading && <Loader />}
      <Flex>
        <div className={classes.regWrap}>
          <div className={classes.logo}>
            <Logo />
          </div>
          <div className={classes.confirmMessage}>
            {
              error
                ? error
                : <>
                  {formatMessage({ id: 'activation.message' })} <NavLink style={{ color: "#20B5EE" }} to="/">{formatMessage({ id: 'auth.submit' })}</NavLink>
                </>
            }
          </div>
        </div>
      </Flex>
      <Flex grow="xs"><div className={classes.leftImg} /></Flex>
    </Flex>
  )
}

export default Activation;
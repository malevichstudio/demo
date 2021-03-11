import React from 'react';
import Logo from "../../components/icons/Logo";
import useStyles from "./styles";
import Flex from "../../components/global/Flex";
import logo from "../../../assets/images/login.jpg";
import { useIntl } from "react-intl";

const EmailConfirm = () => {
  const { formatMessage } = useIntl();
  const classes = useStyles({
    background: logo,
  });
  return (
    <Flex container nowrap flex spacing={0}>
      <Flex>
        <div className={classes.regWrap}>
          <div className={classes.logo}>
            <Logo />
          </div>
          <div className={classes.confirmMessage}>{formatMessage({ id: 'emailConfirm.message' })}</div>
        </div>
      </Flex>
      <Flex grow="xs"><div className={classes.leftImg} /></Flex>
    </Flex>
  )
}

export default EmailConfirm;
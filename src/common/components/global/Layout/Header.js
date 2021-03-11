import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import Button from "@material-ui/core/Button";
import { show } from 'redux-modal';
import useStyles from './styles';
import Flex from "../Flex";
import InnerLangSwitcher from "../InnerLangSwitcher";
import Messages from "../../icons/Messages";
import Announcement from "../../icons/Announcement";
import Badge from "@material-ui/core/Badge";
import Logout from "../../icons/Logout";
import { logout } from "../../../../store/actions/auth";
import defaultLogo from "../../../../assets/images/avatar.png";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import logo from "../../../../assets/images/sidebarLogo.png"
import Burger from "../../icons/Burger";
import { DRAWER } from "../../../constants/modalsNames";
import routes from "../../../routes";
import { useHistory } from "react-router-dom";
import Http from "../../../../http";

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const role = useSelector(state => state.auth.role);
  const name = useSelector(state => state.me.data?.fio?.firstName);
  const avatar = useSelector(state => state.me.data?.pathToPhoto?.uri);
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <header className={classes.header}>
      {!lg && (
        <div className={classes.headerLogoWrap}>
          <Burger onClick={() => dispatch(show(DRAWER))} />
          {md && <img src={logo} alt="logo" />}
        </div>
      )}
      {lg && (
        <>
          <div className={classes.billBlock}>
            <div className={classes.balanceWrap}>
              <div className={classes.balanceTitle}>
                {formatMessage({ id: 'header.balance' })}
              </div>
              <div className={classes.balance}>
                10 500 ₽
              </div>
            </div>
          </div>
          <Flex container spacing={20}>
            <Flex>
              <Button
                variant="outlined"
                color="secondary"
                // onClick={() => push(routes.personalBillReplenishment)}
                onClick={() => Http.get("/adv/v1/camp/my", {
                  params:{
                    archived: true
                  },
                })}
              >
                {formatMessage({ id: 'header.replenishment' })}
              </Button>
            </Flex>
            <Flex>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => push(routes.companyNew)}
              >
                {
                  role === "Advertiser"
                    ? formatMessage({ id: 'header.createCompany' })
                    : formatMessage({ id: 'header.refreshToken' })
                }
              </Button>
            </Flex>
          </Flex>
        </>
      )}
      <Flex container spacing={30} middle="xs" style={{ flexGrow: 0 }}>
        {lg && (
          <Flex>
            <InnerLangSwitcher />
          </Flex>
        )}
        {md && (
          <Flex>
            <Badge badgeContent={4} color="error">
              <Messages style={{ cursor: "pointer" }} />
            </Badge>
          </Flex>
        )}
        <Flex>
          <Badge badgeContent={6} color="error">
            <Announcement style={{ cursor: "pointer" }} />
          </Badge>
        </Flex>
        <Flex flex nowrap middle="xs">
          <div className={classes.profileData}>
            <div className={classes.name}>
              {name}
            </div>
            <div className={classes.role}>
              {formatMessage({
                id: role === "Blogger" ? 'role.blogger' : 'role.advertiser',
              })}
            </div>
          </div>
          <div className={classes.avatar}>
            <img src={avatar || defaultLogo} alt="avatar" />
          </div>
        </Flex>
        {lg && (
          <Flex>
            <Logout style={{ cursor: "pointer" }} onClick={() => dispatch(logout())} />
          </Flex>
        )}
      </Flex>
    </header>

  );
}

export default Header;
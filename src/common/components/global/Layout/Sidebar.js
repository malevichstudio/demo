import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { hide } from "redux-modal";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useIntl } from "react-intl";
import { NavLink, useHistory } from "react-router-dom";
import useTheme from "@material-ui/core/styles/useTheme";
import useStyles from "./styles";
import logo from "../../../../assets/images/sidebarLogo.png"
import { sidebars } from "../../../constants/sidebars";
import SideBarCloser from "../../icons/SideBarCloser";
import Flex from "../Flex";
import { DRAWER } from "../../../constants/modalsNames";
import Logout from "../../icons/Logout";
import { logout } from "../../../../store/actions/auth";
import InnerLangSwitcher from "../InnerLangSwitcher";
import routes from "../../../routes";

const SideBar = () => {
  const classes = useStyles();
  const role = useSelector(state => state.auth.role);
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <div className={classes.body}>
      <div className={classes.logo}>
        <div onClick={() => dispatch(hide(DRAWER))} className={classes.closer}>
          <SideBarCloser style={{ width: 20 }} />
        </div>
        <img src={logo} alt="logo" />
      </div>
      {!lg && (
        <>
          <div className={classes.billBlock}>
            <div className={classes.balanceWrap}>
              <div className={classes.balanceTitle} style={{ color: "white" }}>
                {formatMessage({ id: 'header.balance' })}
              </div>
              <div className={classes.balance}>
                100 500 ₽
              </div>
            </div>
          </div>
          <Flex container spacing={20} column marginBottom>
            <Flex>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => push(routes.personalBillReplenishment)}
              >
                {formatMessage({ id: 'header.replenishment' })}
              </Button>
            </Flex>
            <Flex>
              <Button onClick={() => push(routes.companyNew)} fullWidth variant="contained" color="secondary">
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
      <div>
        {sidebars[role].map(item => {
          const { category, links } = item;
          return (
            <div key={category} className={classes.section}>
              <div className={classes.title}>
                {formatMessage({ id: category })}
              </div>
              {links.map(link => {
                const { name, route, icon: Icon } = link;
                const rootClasses = classNames({
                  [classes.item]: true,
                  [classes.itemActive]: location.pathname.includes(route),
                })
                return (
                  <NavLink key={route} to={route} className={rootClasses}>
                    <span className={classes.icon}>
                      <Icon />
                    </span>
                    {formatMessage({ id: name })}
                  </NavLink>
                )
              })}
            </div>
          )
        })}
      </div>
      {!lg && (
        <Flex container spacing={20} between>
          <Flex>
            <InnerLangSwitcher />
          </Flex>
          <Flex>
            <Logout style={{ cursor: "pointer" }} onClick={() => dispatch(logout())} />
          </Flex>
        </Flex>
      )}
    </div>
  );
}

export default SideBar;
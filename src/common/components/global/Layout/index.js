import React, { useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Flex from "../Flex";
import Header from "./Header";
import Companies from "../../../pages/companies";
import SideBar from "./Sidebar";
import routes from "../../../routes";
import useStyles from "./styles";
import { getProfileTypes } from "../../../../store/actions/companies";
import { getMe } from "../../../../store/actions/me";
import MobileSideBar from "./MobileSideBar";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CompanyNew from "../../../pages/companyNew";
import UserProfile from "../../../pages/userProfile";
import Organisation from "../../../pages/organisation";
import Company from "../../../pages/company";
import BloggersSearch from "../../../pages/bloggersSearch";
import PersonalBill from "../../../pages/personalBill";
import PersonalBillReplenishment from "../../../pages/personalBillReplenishment";
import ProfileInstagram from "../../../pages/instagram";
import CompaniesSearch from "../../../pages/companiesSearch";
import Blogger from "../../../pages/blogger";
import Portfolio from "../../../pages/portfolio";
import Statistic from "../../../pages/statistic";
import Archive from "../../../pages/archive";

const Layout = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const isLogged = useSelector(state => state.auth.isLogged);
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  useEffect(() => {
    if(isAuth){
      dispatch(getMe());
      dispatch(getProfileTypes());
    }
  }, [isAuth]);
  return (
    <Flex xs="100%" flex nowrap>
      {
        lg
          ? <Flex noshrink xs="330px">
              <SideBar />
            </Flex>
          : <MobileSideBar />
      }
      <Flex grow="xs" flex column style={{ minHeight: "100vh" }}>
        <Header />
        <Flex xs="100%" grow="xs" className={classes.layoutInner}>
          <Switch>
            {!isLogged && <Redirect to="/" />}
            <Route exact path={routes.companies}>
              <Companies />
            </Route>
            <Route exact path={routes.company}>
              <Company />
            </Route>
            <Route exact path={routes.companyNew}>
              <CompanyNew />
            </Route>
            <Route exact path={routes.companyEdit}>
              <CompanyNew edit />
            </Route>
            <Route exact path={routes.personalBill}>
              <PersonalBill />
            </Route>
            <Route exact path={routes.personalBillReplenishment}>
              <PersonalBillReplenishment />
            </Route>
            <Route exact path={routes.companySearch}>
              <CompaniesSearch />
            </Route>
            <Route exact path={routes.profile}>
              <UserProfile />
            </Route>
            <Route exact path={routes.inst}>
              <ProfileInstagram />
            </Route>
            <Route exact path={routes.organisation}>
              <Organisation />
            </Route>
            <Route exact path={routes.bloggersSearch}>
              <BloggersSearch />
            </Route>
            <Route exact path={routes.blogger}>
              <Blogger />
            </Route>
            <Route exact path={routes.bloggerPortfolio}>
              <Portfolio />
            </Route>
            <Route exact path={routes.statistics}>
              <Statistic />
            </Route>
            <Route exact path={routes.archive}>
              <Archive />
            </Route>
            <Route path="*">
              404
            </Route>
          </Switch>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Layout;
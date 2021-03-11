import React, {useEffect} from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import 'react-toastify/dist/ReactToastify.css';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import theme from "./common/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import routes from "./common/routes";
import Registration from "./common/pages/registration";
import { I18nProvider } from './i18n'
import Login from "./common/pages/login";
import Reset from "./common/pages/reset";
import EmailConfirm from "./common/pages/emailConfirm";
import Layout from "./common/components/global/Layout";
import Activation from "./common/pages/activation";
import ResetPassword from "./common/pages/reset-password";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./http";
import { setIsAuth } from "./store/actions/auth";

const App = () => {
  const isLogged = useSelector(state => state.auth.isLogged);
  const dispatch = useDispatch();
  useEffect(() => {
    if(isLogged){
      setTimeout(() => {
        setAuthToken(Cookies.get("token"))
          .then(() => dispatch(setIsAuth()));
      }, 500);
    }
  }, [isLogged]);
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <BrowserRouter>
          <ToastContainer
            position="bottom-center"
          />
          <I18nProvider locale="ru">
              <Switch>
                <Route exact path={routes.auth}>
                  <Login />
                </Route>
                <Route exact path={routes.reset}>
                  <Reset />
                </Route>
                <Route exact path={routes.registration}>
                  <Registration />
                </Route>
                <Route exact path={routes.confirm}>
                  <EmailConfirm />
                </Route>
                <Route exact path={routes.activation}>
                  <Activation />
                </Route>
                <Route exact path={routes.resetPassword}>
                  <ResetPassword />
                </Route>
                <Route path="/app">
                  <Layout />
                </Route>
                <Route path="*">
                  404
                </Route>
              </Switch>
          </I18nProvider>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default App;

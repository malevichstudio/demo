import React, { useState } from 'react';
import Typography from "@material-ui/core/Typography";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import {useDispatch, useSelector} from "react-redux";
import Cookies from 'js-cookie';
import Flex from "../../components/global/Flex";
import Button from "@material-ui/core/Button";
import FormInput from "../../components/global/FormInput";
import { useIntl } from "react-intl";
import { auth } from "../../../store/actions/auth";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { NavLink, useHistory } from "react-router-dom";
import AutoCompleteOff from "../../components/global/AutoCompleteOff";
import VisiblePass from "../../components/icons/VisiblePass";
import InvisiblePass from "../../components/icons/InvisiblePass";

const AuthForm = () => {
  const { formatMessage } = useIntl();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(state => state.auth.loading);
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email(formatMessage({ id: 'inputErrors.email' })).required(formatMessage({ id: 'inputErrors.required' })),
    password: Yup.string().required(formatMessage({ id: 'inputErrors.required' })),
  });
  const { handleSubmit, control, errors, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(ValidationSchema),
  });
  const onSubmit = ({ email, password }) => {
    dispatch(auth(
      { email, password },
      ({accessToken, accountId, role}) => {
        reset();
        Cookies.set('token', accessToken, { expires: 7 });
        Cookies.set('accountId', accountId, { expires: 7 });
        Cookies.set('role', role, { expires: 7 });
        history.push('/app/companies')
      },
      () => reset(),
    ))
  }
  return (
    <form style={{ maxWidth: 390 }} onSubmit={handleSubmit(onSubmit)}>
      <Typography style={{ fontWeight: 500, marginBottom: 50 }} variant="h2">{formatMessage({ id: 'auth.name' })}</Typography>
      <Flex marginBottom={20} container spacing={0}>
        <AutoCompleteOff name="email" />
        <Flex xs="100%">
          <FormInput
            error={errors.email}
            errors={errors}
            name="email"
            label="E-mail"
            control={control}
            fullWidth
          />
        </Flex>
        <Flex xs="100%">
          <AutoCompleteOff name="password" type="password" />
          <FormInput
            error={errors.password}
            errors={errors}
            name="password"
            type={passwordVisibility ? "text" : "password"}
            label={formatMessage({ id: 'password.name' })}
            control={control}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                  >
                    {passwordVisibility ? <VisiblePass /> : <InvisiblePass />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Flex>
        <Flex xs="100%">
          <Button disabled={loading} type="submit" variant="contained" color="primary" fullWidth>
            {formatMessage({ id: 'auth.submit' })}
          </Button>
        </Flex>
        <Flex xs="100%">
          {formatMessage({ id: 'auth.hasNotAccount' })} <NavLink style={{ color: "#20B5EE" }} to="/registration">{formatMessage({ id: 'auth.register' })}</NavLink>
        </Flex>
        <Flex xs="100%">
          {formatMessage({ id: 'auth.forgotPassword' })} <NavLink style={{ color: "#20B5EE" }} to="/reset">{formatMessage({ id: 'auth.reset' })}</NavLink>
        </Flex>
      </Flex>
    </form>
  )
};
export default AuthForm;
import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Flex from "../../components/global/Flex";
import Link from '@material-ui/core/Link';
import { useIntl } from "react-intl";
import Button from "@material-ui/core/Button";
import Switcher from "../../components/global/Switch";
import FormInput from "../../components/global/FormInput";
import { registration } from "../../../store/actions/auth";
import { NavLink } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ErrorMessage } from "@hookform/error-message";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import AutoCompleteOff from "../../components/global/AutoCompleteOff";
import VisiblePass from "../../components/icons/VisiblePass";
import InvisiblePass from "../../components/icons/InvisiblePass";

const RegForm = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmVisibility, setConfirmVisibilityVisibility] = useState(false);
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(state => state.auth.loading);
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email(formatMessage({id: 'inputErrors.email'})).required(formatMessage({id: 'inputErrors.required'})),
    password: Yup.string().required(formatMessage({id: 'inputErrors.required'})),
    confirmPassword: Yup.string().test('passwords-match', formatMessage({id: 'inputErrors.password.match'}), function(value) {
      return this.parent.password === value;
    }),
    offer: Yup.boolean().required(),
    data: Yup.boolean().required(),
    firstName: Yup.string().required(formatMessage({id: 'inputErrors.required'})),
    secondName: Yup.string().required(formatMessage({id: 'inputErrors.required'})),
    // middleName: Yup.string().required(formatMessage({id: 'inputErrors.required'})),
    role: Yup.string().required(formatMessage({id: 'inputErrors.required'})),
  });
  const { handleSubmit, control, errors, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(ValidationSchema),
  });
  const onSubmit = ({ email, password, role, firstName, secondName, middleName }) => {
    dispatch(registration(
      { email, password, role, firstName, secondName, middleName },
      () => {
        history.push('/confirm');
        reset();
      },
      () => reset(),
    ))
  }
  return (
    <form style={{ maxWidth: 395 }} onSubmit={handleSubmit(onSubmit)}>
      <Typography style={{ fontWeight: 500, marginBottom: 50 }} variant="h2">{formatMessage({ id: 'registration.name' })}</Typography>
      <Flex marginBottom={20} container spacing={0}>
        <Flex xs="100%">
          <FormInput
            error={errors.firstName}
            errors={errors}
            name="firstName"
            label={formatMessage({ id: 'firstName.name'  })}
            control={control}
            fullWidth
          />
        </Flex>
        <Flex xs="100%">
          <FormInput
            error={errors.secondName}
            errors={errors}
            name="secondName"
            label={formatMessage({ id: 'secondName.name'  })}
            control={control}
            fullWidth
          />
        </Flex>
        {/*<Flex xs="100%">*/}
        {/*  <FormInput*/}
        {/*    error={errors.middleName}*/}
        {/*    errors={errors}*/}
        {/*    name="middleName"*/}
        {/*    label={formatMessage({ id: 'middleName.name'  })}*/}
        {/*    control={control}*/}
        {/*    fullWidth*/}
        {/*  />*/}
        {/*</Flex>*/}
        <Flex xs="100%">
          <AutoCompleteOff name="email" />
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
            label={formatMessage({ id: 'password.name'  })}
            control={control}
            fullWidth
            type={passwordVisibility ? "text" : "password"}
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
          <FormInput
            error={errors.confirmPassword}
            errors={errors}
            name="confirmPassword"
            label={formatMessage({ id: 'password.confirm.name' })}
            control={control}
            fullWidth
            type={confirmVisibility ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setConfirmVisibilityVisibility(!confirmVisibility)}
                  >
                    {confirmVisibility ? <VisiblePass /> : <InvisiblePass />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Flex>
        <Flex xs="100%">
          <Controller
            render={props =>
              <FormControl component="fieldset">
                <RadioGroup value={props.value} onChange={e => props.onChange(e)}>
                  <FormControlLabel value="Advertiser" control={<Radio />} label={formatMessage({ id: 'role.advertiser' })} />
                  <FormControlLabel value="Blogger" control={<Radio />} label={formatMessage({ id: 'role.blogger' })} />
                </RadioGroup>
              </FormControl>
            }
            name="role"
            control={control}
          />
          <ErrorMessage
            render={({ message }) => (
              <div style={{ color: 'red', marginTop: 3 }}>{message}</div>
            )}
            errors={errors}
            name="role"
          />
        </Flex>
        <Flex xs="100%" removeMargin>
          <Flex flex middle="xs">
            <Controller
              error
              render={props => <Switcher error={errors.offer} checked={props.value} onChange={(e, val) => props.onChange(val)} />}
              name="offer"
              control={control}
            />
            <span style={{ color: errors.offer ? '#ff0149' : '#474747'}}>
              {formatMessage({ id: 'agree' })}
            </span>
            <Link style={{ marginLeft: 5 }} href="http://google.com" target="_blank" underline="always">
              {formatMessage({ id: 'offer.link' })}
            </Link>
          </Flex>
        </Flex>
        <Flex xs="100%"  removeMargin>
          <Flex flex middle="xs">
            <Controller
              render={props => <Switcher error={errors.data} checked={props.value} onChange={(e, val) => props.onChange(val)} />}
              name="data"
              control={control}
            />
            <span style={{ color: errors.offer ? '#ff0149' : '#474747'}}>
              {formatMessage({ id: 'agree' })}
            </span>
            <Link style={{ marginLeft: 5 }} href="http://google.com" target="_blank" underline="always">
              {formatMessage({ id: 'personalData.link' })}
            </Link>
          </Flex>
        </Flex>
        <Flex xs="100%">
          <div style={{ color: 'red', marginTop: 5 }}>
            {(errors.offer || errors.data) && formatMessage({ id: 'registration.switchers.error'})}
          </div>
        </Flex>
        <Flex xs="100%">
          <Button disabled={loading} type="submit" variant="contained" color="primary" fullWidth>
            {formatMessage({ id: 'registration.submit' })}
          </Button>
        </Flex>
        <Flex xs="100%">
          {formatMessage({ id: 'auth.hasAccount' })} <NavLink style={{ color: "#20B5EE" }} to="/">{formatMessage({ id: 'auth.enter' })}</NavLink>
        </Flex>
      </Flex>
    </form>
  )
};

export default RegForm;
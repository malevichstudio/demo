import React from 'react';
import Typography from "@material-ui/core/Typography";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch } from "react-redux";
import Flex from "../../components/global/Flex";
import Button from "@material-ui/core/Button";
import FormInput from "../../components/global/FormInput";
import { useIntl } from "react-intl";
import { reset } from "../../../store/actions/auth";
import useStyles from "./styles";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const ResetForm = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email(formatMessage({id: 'inputErrors.email'})).required(formatMessage({id: 'inputErrors.required'})),
  });
  const { handleSubmit, control, errors } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(ValidationSchema),
  });
  const onSubmit = ({ email }) => dispatch(reset(
    email,
    () => toast.success(formatMessage({ id: 'reset.send' })),
  ));
  return (
    <form style={{ maxWidth: 390 }} onSubmit={handleSubmit(onSubmit)}>
      <Typography style={{ fontWeight: 500, marginBottom: 50 }} variant="h2">{formatMessage({id: 'reset.name'})}</Typography>
      <Flex marginBottom={20} container spacing={0}>
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
          <div className={classes.note}>{formatMessage({ id: 'reset.note' })}</div>
        </Flex>
        <Flex xs="100%">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {formatMessage({ id: 'reset.submit' })}
          </Button>
        </Flex>
        <Flex xs="100%">
          {formatMessage({ id: 'auth.hasNotAccount' })} <NavLink style={{ color: "#20B5EE" }} to="/registration">{formatMessage({ id: 'auth.register' })}</NavLink>
        </Flex>
        <Flex xs="100%">
          {formatMessage({ id: 'auth.hasAccount' })} <NavLink style={{ color: "#20B5EE" }} to="/">{formatMessage({ id: 'auth.enter' })}</NavLink>
        </Flex>
      </Flex>
    </form>
  )
};

export default ResetForm;
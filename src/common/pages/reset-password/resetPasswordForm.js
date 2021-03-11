import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import Flex from "../../components/global/Flex";
import Button from "@material-ui/core/Button";
import FormInput from "../../components/global/FormInput";
import { useIntl } from "react-intl";
import { resetPassword } from "../../../store/actions/auth";
import { useParams } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisiblePass from "../../components/icons/VisiblePass";
import InvisiblePass from "../../components/icons/InvisiblePass";

const ResetPasswordForm = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmVisibility, setConfirmVisibility] = useState(false);
  const { token } = useParams();
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const ValidationSchema = Yup.object().shape({
    password: Yup.string().required(formatMessage({id: 'inputErrors.required'})),
    confirmPassword: Yup.string().test('passwords-match', formatMessage({id: 'inputErrors.password.match'}), function(value) {
      return this.parent.password === value;
    }),
  });
  const { handleSubmit, control, errors } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(ValidationSchema),
  });
  const onSubmit = ({ password }) => dispatch(resetPassword(password, token));
  return (
    <form style={{ maxWidth: 390 }} onSubmit={handleSubmit(onSubmit)}>
      <Typography style={{ fontWeight: 500, marginBottom: 50 }} variant="h2">{formatMessage({id: 'reset-password.name'})}</Typography>
      <Flex marginBottom={20} container spacing={0}>
        <Flex xs="100%">
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
                    onClick={() => setConfirmVisibility(!confirmVisibility)}
                  >
                    {confirmVisibility ? <VisiblePass /> : <InvisiblePass />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Flex>
        <Flex xs="100%">
          <Button disabled={loading} type="submit" variant="contained" color="primary" fullWidth>
            {formatMessage({ id: 'reset-password.submit' })}
          </Button>
        </Flex>
      </Flex>
    </form>
  )
};

export default ResetPasswordForm;
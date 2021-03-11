import React from 'react';
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { ErrorMessage } from "@hookform/error-message";

const FormInput = props => {
  const { control, name, errors } = props;
  return (
    <div>
      <Controller
        name={name}
        variant="outlined"
        autoComplete="off"
        as={TextField}
        control={control}
        {...props}
      />
      <ErrorMessage
        render={({ message }) => (
          <div style={{ color: 'red', marginTop: 3 }}>{message}</div>
        )}
        errors={errors}
        name={name}
      />
    </div>
  )
}

export default FormInput;
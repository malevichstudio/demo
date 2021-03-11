import React from 'react';
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import BaseSelect from "../BaseSelect";
import Tooltip from "../Tooltip";
import Tip from "../../icons/Tip";
import useStyles from "./styles";

const FormSelect = props => {
  const { control, name, errors, options, tip, ...rest } = props;
  const classes = useStyles();
  return (
    <div className={classes.wrap}>
      {tip && <div className={classes.tip}>
        <Tooltip offset={5} title={tip}>
          <div>
            <Tip style={{ width: 18 }} />
          </div>
        </Tooltip>
      </div>}
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <BaseSelect
            value={props.value}
            options={options}
            onChange={(event) => props.onChange(event)}
            {...rest}
          />
        )}
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

export default FormSelect;
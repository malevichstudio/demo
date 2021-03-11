import React from "react";
import DatePicker from "react-datepicker";
import { format } from "../../../helpers/DateHelper";
import "react-datepicker/dist/react-datepicker.css";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import {Controller} from "react-hook-form";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "./styles";
import DateIcon from "../../icons/DateIcon";
import BaseSelect from "../BaseSelect";
import {ErrorMessage} from "@hookform/error-message";
import LSHelper from "../../../helpers/LocalStorageHelper";
import {locales} from "../../../constants/locales";


const FormDatepicker = ({ dateFormat, pickerProps, textFiledProps, errors, name, control, ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'date-popover' : undefined;
  const locale = LSHelper.getItem('locale') || 'ru_RU'

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <>
            <TextField
              variant="outlined"
              autoComplete="off"
              fullWidth
              {...textFiledProps}
              InputLabelProps={{
                shrink: Boolean(props.value),
              }}
              value={props.value && format(new Date(props.value), dateFormat || 'dd.MM.yyyy')}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <DateIcon aria-describedby="date-popover" onClick={handleClick} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                classes={{
                  paper: classes.paper,
                }}
              >
                <DatePicker
                  locale={locales[locale]}
                  selected={props.value}
                  onChange={date => props.onChange(date)}
                  inline
                  {...pickerProps}
                />
              </Popover>
            </div>
          </>
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
    </>
  );
};

export default FormDatepicker;


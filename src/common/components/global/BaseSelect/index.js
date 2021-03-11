import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useIntl } from "react-intl";
import useStyles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const BaseSelect = ({
    options,
    isIntl,
    border,
    label,
    ...props
  }) => {
  const classes = useStyles({ border });
  const { formatMessage } = useIntl();
  return (
    <FormControl className={classes.control}>
      {label && <InputLabel className={classes.label} id={JSON.stringify(label)}>{label}</InputLabel>}
      <Select
        labelId={JSON.stringify(label)}
        variant="outlined"
        classes={{
          icon: classes.icon,
          root: classes.root,
        }}
        className={classes.select}
        {...props}
      >
        {options.map(({ label, value }) => {
          return <MenuItem key={value} value={value}>
            {isIntl
              ? formatMessage({ id: label })
              : label
            }
          </MenuItem>
        })}
      </Select>
    </FormControl>
  )
}

export default BaseSelect;
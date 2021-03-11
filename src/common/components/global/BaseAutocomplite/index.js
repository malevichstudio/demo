import React from "react";
import useStyles from "./styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const BaseAutocomplete = ({
  label,
  placeholder,
  ...props
}) => {
  return (
    <Autocomplete
      {...props}
      popupIcon=""
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
        />
      )}
    />
  )
}

export default BaseAutocomplete;
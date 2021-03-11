import React from "react";
import Switch from "@material-ui/core/Switch";
import useStyles from './styles';

const Switcher = (props) => {
  const classes = useStyles({ error: props.error });
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      checked={props.value}
      onChange={(e, val) => props.onChange && props.onChange(val)}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
};

export default Switcher;
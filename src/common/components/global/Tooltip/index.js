import React from "react";
import MuiTooltip  from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/styles";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltipPlacementTop:{
    margin: props => props.offset && `${props.offset}px 0`,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const Tooltip = (props) => {
  const classes = useStylesBootstrap({
    offset: props.offset,
  });

  return <MuiTooltip placement="top" arrow classes={classes} {...props} />;
}

export default Tooltip;
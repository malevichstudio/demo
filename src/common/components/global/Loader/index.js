import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import useStyles from "./styles";

const Loader = ({ local }) => {
  const classes = useStyles({ local });
  return <div className={classes.wrapper}>
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  </div>
}

export default Loader;
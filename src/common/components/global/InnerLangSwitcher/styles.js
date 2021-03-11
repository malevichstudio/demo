import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  select: {
    color: theme.palette.common.grey3,

    "&::before": {
      display: "none"
    },

    "&::after": {
      display: "none"
    },
    
  },
  icon: {
    color: theme.palette.common.grey3,
  },
  root: {
    "&:focus": {
      background: "transparent"
    },
  }
}));

export default useStyles;

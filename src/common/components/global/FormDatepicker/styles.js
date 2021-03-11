import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    "& > div": {
      display: "flex",
    },
  }
}));

export default useStyles;

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  body: {
    padding: "50px 70px!important",
    width: 960,
    position: "relative",

    [theme.breakpoints.down('sm')]: {
      padding: "50px 20px 20px!important",
      width: "100%",
    },
  },
  closer: {
    position: "absolute",
    top: 5,
    right: 5,
  },
}));

export default useStyles;

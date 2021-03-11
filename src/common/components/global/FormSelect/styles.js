import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  wrap: {
    position: "relative",
  },
  tip: {
    position: "absolute",
    top: "50%",
    right: -30,
    cursor: "pointer",
    transform: "translate(-50%, -45%)",
    display: "flex",
  }
}));

export default useStyles;

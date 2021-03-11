import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: props => props.local ? "absolute" : "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1001,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    background: props => props.local ? "transparent" : "rgba(136, 137, 155, 0.3);"
  },
}));

export default useStyles;

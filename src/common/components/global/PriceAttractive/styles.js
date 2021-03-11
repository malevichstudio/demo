import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  line: {
    height: 5,
    margin: "10px 0",
    width: "100%",
    backgroundColor: props => props.color,
    borderRadius: 2,
  },
}));

export default useStyles;

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  box: {
    boxShadow: "10px 10px 20px #A6ABBD",
    borderRadius: 30,
    padding: "12px 20px",
    display: "inline-flex",
    alignItems: "center",
    background: "white",
  },
  image: {
    backgroundImage: props => `url(${props.image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: 25,
    height: 25,
    marginRight: 10,
  },
  message: {
    marginRight: 10,
    fontWeight: 500,
    fontSize: 16,
    display: "flex",

    "& img": {
      width: 25,
      height: "auto",
      display: "block",
    },
  },
  handler: {
    cursor: "pointer",
    display: "flex",

    "& label": {
      display: "flex",
    },
  },
}));

export default useStyles;

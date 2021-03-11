import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 24,
    fontWeight: 500,
    margin: "20px 0",
  },
  accTitle: {
    marginBottom: 5,
  },
  platformBox: {
    boxShadow: "10px 10px 20px #A6ABBD",
    borderRadius: 30,
    padding: "12px 20px",
    display: "inline-flex",
    alignItems: "center",
    background: "white",

    "& a": {
      textDecoration: "none",
      color: theme.palette.common.black,
    }
  },
  platformHandler: {
    cursor: "pointer",
    display: "flex",
    marginLeft: 5,
    transform: props => `rotate(${props.filed ? "45" : "0"}deg)`,

    "& label": {
      display: "flex",
    },
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: "50%",
    background: theme.palette.common.grey5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

    [theme.breakpoints.down('sm')]: {
      width: 275,
      height: 275,
    },

    "& > img": {
      width: "100%",
      height: "auto",
    }
  },
  avatarWrap: {
    position: "relative",

    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
    },
  },
  avatarChanger: {
    position: "absolute",
    width: 55,
    height: 55 ,
    bottom: 5,
    padding: 10,
    fontSize: 7,
    textTransform: "uppercase",
    fontWeight: 600,
    background: "white",
    right: -10,
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,

    [theme.breakpoints.down('sm')]: {
      width: 85,
      height: 85,
      right: -15,
    },
  },
}));

export default useStyles;

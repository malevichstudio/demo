import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  headerLogoWrap: {
    display: "flex",
    alignItems: "center",
    marginRight: "auto",

    "& > img": {
      marginLeft: 15,
    },
  },
  paper: {
    background: "#1E1E2D",
  },
  closer: {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    display: "none",

    [theme.breakpoints.down('md')]: {
      display: "block",
    },
  },
  layoutInner: {
    background: theme.palette.common.grey6,
    padding: "40px 30px",

    [theme.breakpoints.down('md')]: {
      padding: "30px 20px",
    },

    [theme.breakpoints.down('sm')]: {
      padding: "30px 10px",
    },
  },
  logo: {
    marginBottom: 24,
    position: "relative",

    "& img": {
      width: "100%",
    },

    [theme.breakpoints.down('md')]: {
      padding: "0 30px",
    },
  },
  icon: {
    marginRight: 15,

    "& svg": {
      color: "transparent",
    },
  },
  body: {
    background: "#1E1E2D",
    padding: 25,
    minHeight: "100vh",
    height: "100%",

    [theme.breakpoints.down('md')]: {
      height: "auto",
      padding: "25px 10px",
    },

    [theme.breakpoints.down('sm')]: {
      maxWidth: 300,
    },
  },
  section: {
    marginBottom: 15,
  },
  title: {
    color: theme.palette.common.grey4,
    textTransform: "uppercase",
    marginBottom: 15,
    fontSize: 14,

    [theme.breakpoints.down('md')]: {
      marginBottom: 5,
    },
  },
  item: {
    padding: "15px 25px",
    transition: "all 0.3s",
    margin: "0 -25px",
    display: "flex",
    alignItems: "center",
    color: theme.palette.common.white,
    fontSize: 16,
    textDecoration: "none",
    textTransform: "initial",

    "&:hover": {
      background: theme.palette.primary.main,
    },

    [theme.breakpoints.down('md')]: {
      margin: "0 -10px",
      padding: "7px 10px",
    },
  },
  itemActive: {
    background: theme.palette.primary.main,
  },
  billBlock: {
    display: "flex",
    alignItems: "center",
    marginRight: 30,

    [theme.breakpoints.down('md')]: {
      marginRight: 0,
      marginBottom: 30,
    },
  },
  balanceWrap: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    padding: "20px 30px",
    background: "white",
    position: "sticky",
    top: 0,
    zIndex: 10,

    [theme.breakpoints.down('md')]: {
      padding: "5px 10px",
    },
  },
  balanceTitle: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    marginBottom: 5,
  },
  balance: {
    color: theme.palette.common.green,
    fontSize: 36,
    lineHeight: "46px",
    fontWeight: 500,
  },
  profileData: {
    display: "flex",
    flexDirection: "column",
    marginRight: 15,
  },
  name: {
    fontSize: 20,
    lineHeight: "25px",
    fontWeight: 500,
  },
  role: {
    textTransform: "uppercase",
    fontSize: 12,
    lineHeight: "15px",
    fontWeight: 500,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.common.grey5,
    overflow: "hidden",

    "& > img": {
      width: "100%",
      height: "auto",
    },
  },
}));

export default useStyles;

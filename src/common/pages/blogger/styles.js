import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  pieTitle: {
    color: theme.palette.common.grey,
    fontSize: 18,
    fontWeight: 400,
    textAlign: "center",
  },
  newSubs: {
    color: theme.palette.common.green,
    fontSize: 36,
    fontWeight: 700,
  },
  unSubs: {
    color: theme.palette.danger.main,
    fontSize: 36,
    fontWeight: 700,
  },
  dinamicTitle: {
    fontSize: 14,
    textTransform: "uppercase",
    color: theme.palette.common.grey,
    marginBottom: 20,
  },
  portfolioCard: {
    fontSize: 16,
    padding: 10,
    border: `1px solid ${theme.palette.common.grey9}`,
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    overflow: "hidden",

    "& img": {
      width: "100%",
    },
  },
  dinamic: {
    background: "white",
    padding: 15,
  },
  drawer: {
    background: theme.palette.common.grey2,
    padding: 10,
  },
  closer: {
    width: 20,
    "& *": {
      fill: "#868484",
    }
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 5,
  },
  message: {
    fontSize: 18,
    fontWeight: 400,
  },
  rating: {
    display: "flex",
    alignItems: "center",
    fontSize: 16,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  ratingNumbers: {
    fontSize: 36,
    fontWeight: 500,
    marginLeft: 5,
    color: theme.palette.primary.main,

    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  proxyTitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  value: {
    color: theme.palette.secondary.main,
    fontSize: 24,
    fontWeight: 600,
    marginRight: 5,
  },
  proxyValue: {
    fontSize: 18,
    fontWeight: 500,
  },
  avatar: {
    width: 135,
    height: 135,
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down('sm')]: {
      width: 90,
      height: 90,
    },

    "& img": {
      width: "100%",
      height: "auto",
    }
  },
  nickname: {
    fontSize: 20,
    fontWeight: 500,
  },
  platformName: {
    fontSize: 18,
    fontWeight: 500,
  },
  card: {
    background: "white",
    padding: "30px 20px",
    marginBottom: 30,

    [theme.breakpoints.down('sm')]: {
      padding: "20px 10px",
      marginBottom: 20,
    },
  },
  seporator: {
    width: "100%",
    margin: "10px 0",
    height: 1,
    background: theme.palette.common.grey2,
  },
  seporator180: {
    height: "100%",
    margin: "0 10px",
    width: 1,
    background: theme.palette.common.grey2,
  }
}));

export default useStyles;

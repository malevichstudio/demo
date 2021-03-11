import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  tab: {
    background: "white",
    color: theme.palette.common.grey,
    padding: "20px 30px",
    cursor: "pointer",
    transition: "all 0.3s",

    "&.active": {
      color: "white",
      background: theme.palette.primary.main,
    },

    "&:hover": {
      color: "white",
      background: theme.palette.primary.main,
    },
  },
  card: {
    padding: 25,
    background: "white",
  },
  cardTitle: {
    color: theme.palette.common.grey5,
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: 500,
    marginBottom: 10,
  },
  money: {
    color: theme.palette.common.green,
    fontSize: 66,
    fontWeight: 600,
    marginBottom: 10,
  },
  values: {
    color: theme.palette.primary.main,
    fontSize: 66,
    fontWeight: 600,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: 500,
  },
  companyTitle: {
    fontSize: 48,
    fontWeight: 500,
    color: theme.palette.secondary.main,
    marginBottom: 40,
  },
  companySubTitle: {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 30,
  },
  separator: {
    width: "100%",
    margin: "10px 0",
    height: 1,
    background: theme.palette.common.grey2,
  },
  separator180: {
    height: "100%",
    margin: "0 10px",
    width: 1,
    background: theme.palette.common.grey2,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 500,
    color: "#868484",
    marginBottom: 20,
  }
}));


export default useStyles;

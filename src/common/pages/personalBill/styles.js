import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  replenishmentButton: {
    padding: "13px 20px",
  },
  withdrawButton: {
    padding: "13px 20px",
    border: `1px solid ${theme.palette.primary.main}`,
    color: "white",
    fontSize: 16,
    textTransform: "initial",
    fontWeight: 500,
    boxShadow: "none",

    "&.Mui-disabled": {
      borderColor: "transparent",
    },

    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
      color: theme.palette.primary.main,
    },
  },
  column:{
    width: "13.3%",
    display: "flex",
    padding: "0 12px",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },

    [theme.breakpoints.down('sm')]: {
      width: "100%",
      padding: "15px 0",

      "& > div": {
        flexGrow: 0,
      },
    },
  },
  mainColumn: {
    width: "33.14%",
    display: "flex",
    padding: "0 12px",

    [theme.breakpoints.down('sm')]: {
      width: "100%",
      padding: "15px 12px",
    },
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    background: "white",
    margin: '30px 0',
    padding: "10px 25px",
    color: theme.palette.common.grey,
    fontSize: 16,
    fontWeight: 500,
  },
  mobileTitle: {
    fontSize: 14,
    fontWeight: 500,
    display: "none",

    [theme.breakpoints.down('sm')]: {
      display: "block",
      marginRight: "auto",
    },
  },
  payment: {
    margin: "15px 0",
    padding: "10px 25px",
    background: "white",
    marginBottom: 15,
    display: "flex",
    alignItems: "center",

    [theme.breakpoints.down('sm')]: {
      padding: "5px 15px",
      flexDirection: "column",

      "& > div:not(:last-child)": {
        borderBottom: `1px solid ${theme.palette.common.grey2}`,
      },
    },
  },
  text: {
    fontSize: 18,
    fontWeight: 500,

    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  negativeAmount: {
    color: theme.palette.danger.main,
    fontSize: 18,
    fontWeight: 500,

    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  positiveAmount: {
    color: theme.palette.common.green,
    fontSize: 18,
    fontWeight: 500,

    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  paymentSystem: {
    fontSize: 16,
    fontWeight: 400,
  },
}));

export default useStyles;

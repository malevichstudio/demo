import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({

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
  },
  tabsHeadItem: {
    fontSize: 16,
    fontWeight: 500,
    padding: 20,
    background: "white",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: ".3s all",

    "& span": {
      color: theme.palette.primary.main,
      marginLeft: 120,
    },

    "&.active": {
      background: theme.palette.primary.main,
      color: "white",

      "& span": {
        color: "white",
      },
    },
    "&:hover": {
      background: theme.palette.primary.main,
      color: "white",

      "& span": {
        color: "white",
      },
    }
  },
  searchRoot: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    }
  },
  filters: {
    marginTop: 40,
  },
  company: {
    padding: "10px 25px",
    background: "white",
    marginBottom: 15,
    display: "flex",

    [theme.breakpoints.down('sm')]: {
      padding: "5px 15px",
      flexDirection: "column",

      "& > div:not(:last-child)": {
        borderBottom: `1px solid ${theme.palette.common.grey2}`,
      },
    },
  },
  budget: {
    fontSize: 18,
    fontWeight: 500,

    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  response: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.common.grey2,
    fontSize: 14,
    fontWeight: 500,
    transition: "0.3s all",

    "&:hover": {
      color: "white",
      background: theme.palette.common.grey8,
    }
  },
  hashtag: {
    fontSize: 16,
    fontWeight: 400,
  },
  status: {
    margin: "15px 0",
    fontSize: 16,
    fontWeight: 500,
    textTransform: "uppercase",
    color: theme.palette.common.grey3,
  },
  column:{
    width: "11.14%",
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

  mobileTitle: {
    fontSize: 14,
    fontWeight: 500,
    display: "none",

    [theme.breakpoints.down('sm')]: {
      display: "block",
      marginRight: "auto",
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
    background: "white",
    marginTop: 30,
    padding: "10px 25px",
    color: theme.palette.common.grey,
    fontSize: 16,
    fontWeight: 500,

  },
  favorite: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#FFC107",
    color: "white",
    fontSize: 14,
    fontWeight: 500,
    transition: "0.3s all",

    "&:hover": {
      background: "rgba(255, 193, 7, 0.7)",
    },
  },
  date: {
    fontSize: 18,
    fontWeight: 400,

    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  companyLogo: {
    width: 76,
    height: 76,
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& > img": {
      width: "100%",
      height: "auto",
    }
  },
  companyName: {
    maxWidth: 345,
    fontSize: 18,
    fontWeight: 400,
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",

    "& a": {
      color: theme.palette.common.black,
      textDecoration: "none",
    },

    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  }
}));

export default useStyles;

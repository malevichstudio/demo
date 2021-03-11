import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  logo: {
    "& > svg": {
      width: 422,
      height: 33,
      maxWidth: "100%",
    },
    marginBottom: 50,
  },
  regWrap: {
    padding: '50px 140px',
    height: '100vh',
    overflowY: "auto",

    [theme.breakpoints.down('md')]: {
      padding: '50px 30px',
    },

    [theme.breakpoints.down('sm')]: {
      padding: '50px 10px',
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: 'center'
    },
  },
  leftImg: {
    height: '100vh',
    backgroundImage: props => `url(${props.background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  },

  leftImgWrap: {
    [theme.breakpoints.down('sm')]: {
      display: "none",
    },
  },
  confirmMessage: {
    marginTop: 80,
    maxWidth: 560,
    padding: "15px 30px",
    background: theme.palette.common.grey2,
    fontSize: 18,
    color: theme.palette.common.black,
  },
}));

export default useStyles;
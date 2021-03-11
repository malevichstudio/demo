import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  inputTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 10,
  },
  inputSubtitle: {
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 20,
  },
  logo: {
    height: 230,
    backgroundPosition: "center",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    overflow: "hidden",
    border: `1px solid ${theme.palette.common.grey9}`
  },
  creativesLabel: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  stepWrap: {
    background: "white",
    padding: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    [theme.breakpoints.down('md')]: {
      padding: "20px 15px",
    },
  },
  tag: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontSize: 16,
    fontWeight: 400,
    padding: "5px 15px",
    borderRadius: 100,
  },
  tagCloser: {
    cursor: "pointer",
    width: 24,
    height: 24,
    marginLeft: 5,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11.5' cy='11.5' r='11.5' fill='%23EDEDED'/%3E%3Cpath d='M16.5448 15.8089L12.5725 11.8367L16.5448 7.86446C16.7479 7.66133 16.7479 7.332 16.5448 7.12886C16.3416 6.92573 16.0123 6.92573 15.8092 7.12886L11.8369 11.1011L7.86467 7.12886C7.66154 6.92573 7.33221 6.92573 7.12907 7.12886C6.92594 7.332 6.92594 7.66133 7.12907 7.86446L11.1013 11.8367L7.12907 15.8089C6.92594 16.0121 6.92594 16.3414 7.12907 16.5445C7.33221 16.7477 7.66154 16.7477 7.86467 16.5445L11.8369 12.5723L15.8092 16.5445C16.0123 16.7477 16.3416 16.7477 16.5448 16.5445C16.7479 16.3414 16.7479 16.0121 16.5448 15.8089Z' fill='black'/%3E%3C/svg%3E%0A\")",
  },
  stepInputWrap: {
    maxWidth: 800,
    width: "100%",
  },
  stepInner: {
    maxWidth: 780,
    width: "100%",
  },
  title: {
    marginBottom: 40,
  },
  stepHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: 50,

    [theme.breakpoints.down('md')]: {
      justifyContent: "center",
    },

    "&:before": {
      display: "block",
      content: "''",
      position: "absolute",
      top: 26,
      zIndex: 1,
      left: "10%",
      right: "10%",
      background: theme.palette.common.grey5,
      height: 2,

      [theme.breakpoints.down('md')]: {
        display: "none",
      },
    }
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: 500,
    marginTop: 5,
  },
  stepIndex: {
    width: 54,
    height: 54,
    position: "relative",
    zIndex: 2,
    cursor: "pointer",
    borderRadius: "50%",
    background: theme.palette.common.grey5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: 500,

    "&.active": {
      background: theme.palette.secondary.main,
      color: "white",
    },
  }
}));

export default useStyles;
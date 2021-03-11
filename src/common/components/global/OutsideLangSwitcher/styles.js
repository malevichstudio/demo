import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  languagesWrap: {
    marginTop: 60,
  },

  language: {
    fontSize: 24,
    color: theme.palette.common.black,
    textTransform: "uppercase",
    cursor: "pointer",
  },

  active: {
    color: theme.palette.common.grey3,
  },
}));

export default useStyles;

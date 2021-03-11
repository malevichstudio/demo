import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  dinamic: {
    background: "white",
    padding: 10,
  },
  dinamicTitle: {
    fontSize: 14,
    fontWeight: 500,
    textTransform: "uppercase",
    maxWidth: 180,
    color: theme.palette.common.grey,
  },
  dinamicSubtitle: {
    fontSize: 16,
    fontWeight: 400,
  },
  category: {
    padding: "5px 10px",
    borderRadius: 20,
    background: theme.palette.primary.main,
    color: "white",
  },
  pagetitle: {
    cursor: "pointer",
    display: 'inline-block'
  },
  pieTitle: {
    color: theme.palette.common.grey,
    fontSize: 18,
    fontWeight: 400,
    textAlign: "center",
  },
  title: {
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 20,
  },
  fakeInput: {
    background: "white",
    padding: "18.5px 14px",
    minHeight: 56,
    fontSize: 16,
    border: `1px solid ${theme.palette.common.grey9}`,
    borderRadius: 4,
    position: "relative",
  },
  iconWrap: {
    display: "flex",
    position: 'relative',
    top: 2,

    "& svg": {
      width: 16,
      height: 16,
    }
  },
  fakeLabel: {
    position: "absolute",
    top: 3,
    left: 15,
    color: theme.palette.common.grey,
    fontSize: 12,
    fontWeight: 500,
  },
}));

export default useStyles;
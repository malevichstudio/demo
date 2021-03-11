import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  logo: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& img": {
      width: "100%",
    },
  },
  reviewTitle: {
    fontSize: 36,
    fontWeight: 500,
    marginBottom: 20,
  },
  reviewCompany: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 18,
    fontWeight: 400,
  },
  reviewAva: {
    width: 110,
    height: 110,
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& img": {
      width: "100%",
    },
  },
  statisticsTitle: {
    fontSize: 20,
    fontWeight: 500,
  },
  statisticsPercentage: {
    fontSize: 36,
    fontWeight: 600,
  },
  name: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 5,
  },
  company: {
    fontSize: 16,
    fontWeight: 400,
  },
  title: {
    fontSize: 36,
    fontWeight: 500,
    maxWidth: 560,
  },
  platform: {
    fontSize: 16,
    display: "inline-flex",
    alignItems: "center",
    textTransform: "uppercase",

    "& svg": {
      margin: "0 8px",
    },
  },
  rating: {
    borderRadius: 30,
    fontSize: 36,
    fontWeight: 600,
    color: "white",
    background: theme.palette.primary.main,
    padding: "5px 15px",

  },
  card: {
    borderRadius: 3,
    background: "white",
    padding: 20,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  seporator: {
    marginTop: 10,
    width: "100%",
    height: 1,
    background: theme.palette.common.grey,
  },
  priceTitle: {
    fontSize: 20,
    fontWeight: 500,
  },
  price: {
    fontSize: 36,
    fontWeight: 600,
  },
  container: {
    maxWidth: 670,
  },
  theme: {
    fontSize: 14,
    fontWeight: 400,
    color: "white",
    borderRadius: 20,
    padding: "5px 10px",
    background: theme.palette.primary.main,
  },
}));

export default useStyles;

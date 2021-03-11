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
  nickname: {
    fontSize: 20,
    fontWeight: 500,
  },
  platformName: {
    fontSize: 18,
    fontWeight: 500,
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
  title: {
    cursor: "pointer",
    marginBottom: 40,
  },
  category: {
    borderRadius: 20,
    background: theme.palette.primary.main,
    padding: "5px 10px",
    color: "white",
  },
  memberItem: {
    padding: 20,
    background: "#F2F2F2",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& > img": {
      width: "100%",
    },
  },
  memberName: {
    fontSize: 18,
    fontWeight: 500,
  },
  memberTags: {
    fontSize: 14,
    fontWeight: 400,
  },
  memberRating: {
    fontSize: 24,
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  filterWrap: {
    overflow: "hidden",
  },
  filter: {
    margin: -1,
    display: "flex",
    flexWrap: "wrap",
  },
  filterItem: {
    width: "50%",
    border: `0.5px solid ${theme.palette.common.grey5}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "white",
    padding: 20,
    cursor: "pointer",
    transition: "all 0.3s",

    "& .name": {
      fontSize: 16,
      fontWeight: 400,
    },


    "&:hover": {
      background: theme.palette.primary.main,

      "& .count": {
        color: "white",
      },

      "& .name": {
        color: "white",
      },
    },

    "&.active": {
      background: theme.palette.primary.main,

      "& .count": {
        color: "white",
      },

      "& .name": {
        color: "white",
      },
    },
  },
  fakeInput: {
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
  cardTitle: {
    textTransform: "uppercase",
    display: "flex",
    alignItems: "flex-end",
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.common.grey,
  },
  agreeingBloggersList: {
    backgroundColor: "#FFC107",
    padding: "10px 30px",
    color: "white",
    borderRadius: 4,
    fontSize: 16,
    fontWeight: 500,

    [theme.breakpoints.down('sm')]: {
      maxWidth: "70%",
      padding: 0,
      backgroundColor: "white",
      color: theme.palette.common.black,
    },
  },
  budget: {
    fontSize: 16,
    fontWeight: 500,
  },
  topCardItem: {
    [theme.breakpoints.down('sm')]: {
      borderBottom: `1px solid ${theme.palette.common.grey2}`,
      marginBottom: 10,
      paddingBottom: 10,
    },
  },
  topCard: {
    padding: "10px 25px",
    background: "white",
    marginBottom: 20,
  },
  card: {
    padding: "30px 25px 10px",
    background: "white",
  },
  bloggersCount: {
    color: theme.palette.primary.main,
    fontSize: 36,
    fontWeight: 600,
    marginLeft: 15,
    lineHeight: .9,
  },
  logo: {
    width: 75,
    height: 75,
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down('sm')]: {
      width: 180,
      height: 180,
    },

    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }
  },
}));

export default useStyles;
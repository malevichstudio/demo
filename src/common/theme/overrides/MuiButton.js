import palette from '../palette';

const MuiButton = {
  containedPrimary: {
    backgroundColor: palette.primary.main,
    color: '#ffffff',
    fontSize: 16,
    padding: '14px 20px',
    textTransform: 'initial',
  },
  containedSecondary: {
    padding: "10px 20px",
    border: `1px solid ${palette.secondary.main}`,
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
      color: palette.secondary.main,
    }
  },
  outlinedSecondary: {
    padding: "10px 20px",
    fontSize: 16,
    textTransform: "initial",
    fontWeight: 500,

    "&:hover": {
      backgroundColor: palette.secondary.main,
      color: "white",
    }
  },
};

export default MuiButton;

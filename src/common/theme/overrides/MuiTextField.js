import palette from '../palette';

const MuiTextField = {
  root: {
    background: "white",
    borderRadius: 4,

    "& .MuiInputBase-root": {
      position: "static",
    },

    "& .MuiInputBase-input.Mui-disabled": {
      color: palette.common.black,
    },

    "& .MuiFormHelperText-root": {
      marginLeft: 0,
      marginRight: 0,
      color: palette.common.grey,
      fontSize: 12,
      fontWeight: 400,
    },

    "& input::placeholder": {
      color: palette.common.grey,
      fontSize: 16,
      fontWeight: 500,
      opacity: 1,
    },

    "& textarea::placeholder": {
      color: palette.common.grey,
      fontSize: 16,
      fontWeight: 500,
      opacity: 1,
    },

    "& fieldset": {
      top: 0,
    },

    "& legend": {
      display: "none"
    },

    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, 6px) scale(0.75)",
      color: palette.common.grey,

      "& + .MuiInputBase-root": {

        "& > input": {
          transform: "translateY(5px)",
        },
      },
    },

    "& .MuiFormLabel-root": {
      color: palette.common.grey,
      fontSize: 16,
      fontWeight: 500,
    },

    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: palette.primary.main,
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: palette.primary.main,
    }
  },
};

export default MuiTextField;

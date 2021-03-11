import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  control: {
    width: "100%",

    "& fieldset": {
      top: 0,
      borderColor: "red!important"
    },
  },
  icon: {
    color: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23B0B4C2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A\")",
  },
  label: {
    color: `${theme.palette.common.grey}!important`,
    zIndex: 3,
    left: 14,
    top: -4,

    "&.MuiInputLabel-shrink": {
      top: 3,
    },
  },

  root: {
    background: "white!important",
  },

  select: {
    "& legend": {
      display: "none",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: props => props.border ? "transparent" : theme.palette.primary.main,
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: props => props.border ? "transparent" : theme.palette.primary.main,
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: props => props.border && "transparent",
    },
  },
}));

export default useStyles;

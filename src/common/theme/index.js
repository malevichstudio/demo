import { createMuiTheme } from '@material-ui/core/styles';
import palette from "./palette";
import overrides from './overrides';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'TT Firs Neue',
    ].join(','),
    fontWeight: '500',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 1000,
      lg: 1440,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
            fontFamily: 'TTFirs',
        },
      },
    },
    ...overrides,
  },
  palette,
});

export default theme;

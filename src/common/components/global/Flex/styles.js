import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,

    '& > *': {
      paddingLeft: props => `${props.spacing}px`,
      marginBottom: props => `${props.marginBottom ? (props.marginBottom === true ? props.spacing : props.marginBottom) : 0}px`,
    },

    marginLeft: props => `-${props.spacing}px`,
  },

  xsTextCenter: {
    '@media (min-width: 0px)': {
      textAlign: 'center',
    },
  },
  between: {
    justifyContent: 'space-between',
  },
  smTextCenter: {
    '@media (min-width: 320px)': {
      textAlign: 'center',
    },
  },
  mdTextCenter: {
    '@media (min-width: 768px)': {
      textAlign: 'center',
    },
  },
  lgTextCenter: {
    '@media (min-width: 1000px)': {
      textAlign: 'center',
    },
  },
  xlTextCenter: {
    '@media (min-width: 1440px)': {
      textAlign: 'center',
    },
  },

  noWordWrap: {
    whiteSpace: 'nowrap',
  },

  removeMargin: {
    marginBottom: '0!important',
  },
  flex: {
    display: 'flex',
  },
  column: {
    flexDirection: 'column',
  },
  relative: {
    position: 'relative',
  },
  nowrap: {
    flexWrap: 'nowrap',
  },
  height: {
    height: props => props.height,
  },
  noshrink: {
    flexShrink: 0,
  },
  order: {
    order: props => props.order,
  },
  xs: {
    '@media (min-width: 0px)': {
      width: props => props.xs,
    },
  },
  sm: {
    '@media (min-width: 320px)': {
      width: props => props.sm,
    },
  },
  md: {
    '@media (min-width: 768px)': {
      width: props => props.md,
    },
  },
  lg: {
    '@media (min-width: 1000px)': {
      width: props => props.lg,
    },
  },
  xl: {
    '@media (min-width: 1440px)': {
      width: props => props.xl,
    },
  },
  xsHidden: {
    '@media (max-width: 0px)': {
      display: 'none!important',
    },
  },
  smHidden: {
    '@media (max-width: 479.9px)': {
      display: 'none!important',
    },
  },
  mdHidden: {
    '@media (max-width: 767.9px)': {
      display: 'none!important',
    },
  },
  lgHidden: {
    '@media (max-width: 1023.9px)': {
      display: 'none!important',
    },
  },
  xlHidden: {
    '@media (max-width: 1199.9px)': {
      display: 'none!important',
    },
  },
  xsVisible: {
    '@media (min-width: 0px)': {
      display: 'none!important',
    },
  },
  smVisible: {
    '@media (min-width: 320px)': {
      display: 'none!important',
    },
  },
  mdVisible: {
    '@media (min-width: 768px)': {
      display: 'none!important',
    },
  },
  lgVisible: {
    '@media (min-width: 1000px)': {
      display: 'none!important',
    },
  },
  xlVisible: {
    '@media (min-width: 1440px)': {
      display: 'none!important',
    },
  },
  xsGrow: {
    '@media (min-width: 0px)': {
      flexGrow: 1,
    },
  },
  smGrow: {
    '@media (min-width: 320px)': {
      flexGrow: 1,
    },
  },
  mdGrow: {
    '@media (min-width: 768px)': {
      flexGrow: 1,
    },
  },
  lgGrow: {
    '@media (min-width: 1000px)': {
      flexGrow: 1,
    },
  },
  xlGrow: {
    '@media (min-width: 1440px)': {
      flexGrow: 1,
    },
  },
  xsLeft: {
    '@media (min-width: 0px)': {
      justifyContent: 'flex-start',
    },
  },
  xsRight: {
    '@media (min-width: 0px)': {
      justifyContent: 'flex-end',
    },
  },
  xsCenter: {
    '@media (min-width: 0px)': {
      justifyContent: 'center',
    },
  },
  smLeft: {
    '@media (min-width: 320px)': {
      justifyContent: 'flex-start',
    },
  },
  smRight: {
    '@media (min-width: 320px)': {
      justifyContent: 'flex-end',
    },
  },
  smCenter: {
    '@media (min-width: 320px)': {
      justifyContent: 'center',
    },
  },
  mdLeft: {
    '@media (min-width: 768px)': {
      justifyContent: 'flex-start',
    },
  },
  mdRight: {
    '@media (min-width: 768px)': {
      justifyContent: 'flex-end',
    },
  },
  mdCenter: {
    '@media (min-width: 768px)': {
      justifyContent: 'center',
    },
  },
  lgLeft: {
    '@media (min-width: 1000px)': {
      justifyContent: 'flex-start',
    },
  },
  lgRight: {
    '@media (min-width: 1000px)': {
      justifyContent: 'flex-end',
    },
  },
  lgCenter: {
    '@media (min-width: 1000px)': {
      justifyContent: 'center',
    },
  },
  xlLeft: {
    '@media (min-width: 1440px)': {
      justifyContent: 'flex-start',
    },
  },
  xlRight: {
    '@media (min-width: 1440px)': {
      justifyContent: 'flex-end',
    },
  },
  xlCenter: {
    '@media (min-width: 1440px)': {
      justifyContent: 'center',
    },
  },
  xsTop: {
    '@media (min-width: 0px)': {
      alignItems: 'flex-start',
    },
  },
  smTop: {
    '@media (min-width: 320px)': {
      alignItems: 'flex-start',
    },
  },
  mdTop: {
    '@media (min-width: 768px)': {
      alignItems: 'flex-start',
    },
  },
  lgTop: {
    '@media (min-width: 1000px)': {
      alignItems: 'flex-start',
    },
  },
  xlTop: {
    '@media (min-width: 1440px)': {
      alignItems: 'flex-start',
    },
  },
  xsBottom: {
    '@media (min-width: 0px)': {
      alignItems: 'flex-end',
    },
  },
  smBottom: {
    '@media (min-width: 320px)': {
      alignItems: 'flex-end',
    },
  },
  mdBottom: {
    '@media (min-width: 768px)': {
      alignItems: 'flex-end',
    },
  },
  lgBottom: {
    '@media (min-width: 1000px)': {
      alignItems: 'flex-end',
    },
  },
  xlBottom: {
    '@media (min-width: 1440px)': {
      alignItems: 'flex-end',
    },
  },
  xsMiddle: {
    '@media (min-width: 0px)': {
      alignItems: 'center',
    },
  },
  smMiddle: {
    '@media (min-width: 320px)': {
      alignItems: 'center',
    },
  },
  mdMiddle: {
    '@media (min-width: 768px)': {
      alignItems: 'center',
    },
  },
  lgMiddle: {
    '@media (min-width: 1000px)': {
      alignItems: 'center',
    },
  },
  xlMiddle: {
    '@media (min-width: 1440px)': {
      alignItems: 'center',
    },
  },
}));

export default useStyles;

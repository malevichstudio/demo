import React from 'react';
import classNames from 'classnames';
import useStyles from './styles';

const displayName = 'FlexComponent';

const Flex = props => {
  const {
    children, container, spacing, marginBottom, flex, column,
    nowrap, order, xs, sm, md, lg, xl, noshrink, className,
    hidden, visible, grow, height, left, right, center, middle, bottom,
    top, marginLast, removeMargin, noWordWrap, relative, textCenter, between,
    ...rest
  } = props;

  const classes = useStyles({
    container,
    spacing,
    marginBottom,
    order,
    xs,
    sm,
    md,
    lg,
    xl,
    height,
    marginLast,
  });
  const rootClasses = classNames({
    [classes.container]: container,
    [classes.flex]: flex,
    [classes.column]: column,
    [classes.alignCenter]: textCenter,
    [classes.between]: between,
    [classes.relative]: relative,
    [classes.nowrap]: nowrap,
    [classes.noWordWrap]: noWordWrap,
    [classes.noshrink]: noshrink,
    [classes.order]: order !== 0,
    [classes.xs]: xs,
    [classes.sm]: sm,
    [classes.md]: md,
    [classes.lg]: lg,
    [classes.xl]: xl,
    [classes.xsHidden]: hidden === 'xs',
    [classes.smHidden]: hidden === 'sm',
    [classes.mdHidden]: hidden === 'md',
    [classes.lgHidden]: hidden === 'lg',
    [classes.xlHidden]: hidden === 'xl',
    [classes.xsVisible]: visible === 'xs',
    [classes.smVisible]: visible === 'sm',
    [classes.mdVisible]: visible === 'md',
    [classes.lgVisible]: visible === 'lg',
    [classes.xlVisible]: visible === 'xl',
    [classes.xsGrow]: grow === 'xs',
    [classes.smGrow]: grow === 'sm',
    [classes.mdGrow]: grow === 'md',
    [classes.lgGrow]: grow === 'lg',
    [classes.xlGrow]: grow === 'xl',
    [classes.xsTop]: top === 'xs',
    [classes.smTop]: top === 'sm',
    [classes.mdTop]: top === 'md',
    [classes.lgTop]: top === 'lg',
    [classes.xlTop]: top === 'xl',
    [classes.xsBottom]: bottom === 'xs',
    [classes.smBottom]: bottom === 'sm',
    [classes.mdBottom]: bottom === 'md',
    [classes.lgBottom]: bottom === 'lg',
    [classes.xlBottom]: bottom === 'xl',
    [classes.xsRight]: right === 'xs',
    [classes.smRight]: right === 'sm',
    [classes.mdRight]: right === 'md',
    [classes.lgRight]: right === 'lg',
    [classes.xlRight]: right === 'xl',
    [classes.xsLeft]: left === 'xs',
    [classes.smLeft]: left === 'sm',
    [classes.mdLeft]: left === 'md',
    [classes.lgLeft]: left === 'lg',
    [classes.xlLeft]: left === 'xl',
    [classes.xsCenter]: center === 'xs',
    [classes.smCenter]: center === 'sm',
    [classes.mdCenter]: center === 'md',
    [classes.lgCenter]: center === 'lg',
    [classes.xlCenter]: center === 'xl',
    [classes.xsMiddle]: middle === 'xs',
    [classes.smMiddle]: middle === 'sm',
    [classes.mdMiddle]: middle === 'md',
    [classes.lgMiddle]: middle === 'lg',
    [classes.xlMiddle]: middle === 'xl',
    [classes.xsTextCenter]: textCenter === 'xs',
    [classes.smTextCenter]: textCenter === 'sm',
    [classes.mdTextCenter]: textCenter === 'md',
    [classes.lgTextCenter]: textCenter === 'lg',
    [classes.xlTextCenter]: textCenter === 'xl',
    [classes.height]: height,
    [classes.removeMargin]: removeMargin,
    [className]: !!className,
  });

  return (
    <div className={rootClasses} {...rest}>
      {children}
    </div>
  );
};


Flex.displayName = displayName;

export default Flex;

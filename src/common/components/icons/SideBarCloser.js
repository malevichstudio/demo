import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

const SideBarCloser = (props) => {
  return (
    <SvgIcon width="20" height="20" viewBox="0 0 20 20" {...props}>
      <path d="M20 2L18 0L10 8L2 0L0 2L8 10L0 18L2 20L10 12L18 20L20 18L12 10L20 2Z" fill="white"/>
    </SvgIcon>
  );
};

export default SideBarCloser;

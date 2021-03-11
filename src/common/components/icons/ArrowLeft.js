import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

const ArrowLeft = (props) => {
  return (
    <SvgIcon width="21" height="8" viewBox="0 0 21 8" {...props}>
      <path d="M0.646446 4.35356C0.451185 4.15829 0.451185 3.84171 0.646446 3.64645L3.82843 0.464468C4.02369 0.269205 4.34027 0.269205 4.53553 0.464468C4.7308 0.65973 4.7308 0.976312 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53554C4.34027 7.7308 4.02369 7.7308 3.82843 7.53554L0.646446 4.35356ZM21 4.5L1 4.5L1 3.5L21 3.5L21 4.5Z" fill="#474747"/>
    </SvgIcon>
  );
};

export default ArrowLeft;

import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

const Checked = (props) => {
  return (
    <SvgIcon width="22" height="22" viewBox="0 0 22 22" {...props}>
      <path d="M11 -0.00012207C4.92486 -0.00012207 0 4.92474 0 10.9999C0 17.075 4.92486 21.9998 11 21.9998C17.0751 21.9998 22 17.075 22 10.9999C21.9935 4.92745 17.0724 0.00636928 11 -0.00012207ZM17.0555 7.6268L9.19833 15.4839C8.89149 15.7907 8.39414 15.7907 8.08734 15.4839L4.94447 12.3411C4.63234 12.0396 4.62368 11.5422 4.92514 11.2301C5.22659 10.918 5.72399 10.9093 6.03612 11.2108C6.04266 11.2171 6.04911 11.2235 6.05546 11.2301L8.64284 13.8175L15.9445 6.51581C16.2566 6.21435 16.754 6.22301 17.0555 6.5351C17.3496 6.83959 17.3496 7.3223 17.0555 7.6268Z" fill="#22CBB1"/>
    </SvgIcon>
  );
};

export default Checked;
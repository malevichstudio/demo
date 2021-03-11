import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

const CompanyData = (props) => {
  return (
    <SvgIcon width="27" height="22" viewBox="0 0 27 22" {...props}>
      <path d="M17.4 1.1C20.3 1.1 22.7 3.4 22.7 6.3C22.7 9.2 20.3 11.5 17.4 11.5V12C19.7 12 21.8 12.9 23.4 14.5C25 16.1 25.9 18.2 25.9 20.4M1 20.6C1 15.9 4.8 12.1 9.5 12.1C14.2 12.1 18 15.9 18 20.6M14.7 6.3C14.7 9.22711 12.3271 11.6 9.4 11.6C6.47289 11.6 4.1 9.22711 4.1 6.3C4.1 3.37289 6.47289 1 9.4 1C12.3271 1 14.7 3.37289 14.7 6.3Z" stroke="white" stroke-width="1.7" stroke-miterlimit="10" stroke-linecap="round"/>
    </SvgIcon>
  );
};

export default CompanyData;
import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

const AddFile = (props) => {
  return (
    <SvgIcon width="32" height="32" viewBox="0 0 32 32" {...props}>
      <rect width="32" height="32" rx="16" fill="#20B5EE"/>
      <path d="M10.4688 16.4688H15.5312V21.5312C15.5312 21.7901 15.7411 22 16 22C16.2589 22 16.4688 21.7901 16.4688 21.5312V16.4688H21.5312C21.7901 16.4688 22 16.2589 22 16C22 15.7411 21.7901 15.5312 21.5312 15.5312H16.4688V10.4688C16.4688 10.2099 16.2589 10 16 10C15.7411 10 15.5312 10.2099 15.5312 10.4688V15.5312H10.4688C10.2099 15.5312 10 15.7411 10 16C10 16.2589 10.2099 16.4688 10.4688 16.4688Z" fill="white"/>
    </SvgIcon>
  );
};

export default AddFile;

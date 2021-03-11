import SideBar from "./Sidebar";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { hide, connectModal } from 'redux-modal';
import { useDispatch } from "react-redux";
import { DRAWER } from "../../../constants/modalsNames";
import useStyles from "./styles";

const MobileSideBar = ({ show }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Drawer
      classes={{ paper: classes.paper }}
      anchor="left"
      open={show}
      onClose={() => dispatch(hide(DRAWER))}
    >
      <SideBar />
    </Drawer>
  )
}

export default connectModal({
  name: DRAWER,
  getModalState: (state) => state.modals,
})(MobileSideBar)
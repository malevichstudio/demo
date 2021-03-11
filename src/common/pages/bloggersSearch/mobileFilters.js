import SearchForm from "./SearchForm";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { useIntl } from "react-intl";
import { hide, connectModal } from 'redux-modal';
import { useDispatch } from "react-redux";
import { BLOGGERS_FILTERS } from "../../constants/modalsNames";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import SideBarCloser from "../../components/icons/SideBarCloser";
import Flex from "../../components/global/Flex";

const MobileFilters = ({ show, onSubmit }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { formatMessage } = useIntl();
  return (
    <Drawer
      anchor="left"
      open={show}
      onClose={() => dispatch(hide(BLOGGERS_FILTERS))}
    >
      <div className={classes.drawer}>
        <Flex flex between middle="xs">
          <Typography variant="h3">
            {formatMessage({ id: "pages.bloggersSearch.filter" })}
          </Typography>
          <div onClick={() => dispatch(hide(BLOGGERS_FILTERS))} >
            <SideBarCloser className={classes.closer} />
          </div>
        </Flex>
        <SearchForm onSubmit={onSubmit} />
      </div>
    </Drawer>
  )
}

export default connectModal({
  name: BLOGGERS_FILTERS,
  getModalState: (state) => state.modals,
})(MobileFilters)
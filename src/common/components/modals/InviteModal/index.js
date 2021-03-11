import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useIntl } from "react-intl";
import DialogContent from '@material-ui/core/DialogContent';
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import { connectModal, hide } from "redux-modal";
import IconButton from "@material-ui/core/IconButton";
import Flex from "../../global/Flex";
import {statuses} from "../../../constants/companiesStatuses";
import BaseSelect from "../../global/BaseSelect";
import { SEND_INVITE } from "../../../constants/modalsNames";
import useStyles from './styles';
import Http from "../../../../http";
import {toast} from "react-toastify";

const InviteModal = ({
    show,
    bloggerId,
    myCompanies
}) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const [currentCompany, setCurrentCompany] = useState();
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={show}
        onClose={() => dispatch(hide(SEND_INVITE))}
        maxWidth="md"
      >
        <DialogContent className={classes.body}>
          <IconButton className={classes.closer} onClick={() => dispatch(hide(SEND_INVITE))}>
            <CloseIcon />
          </IconButton>
          <Typography style={{ marginBottom: 15 }} variant="h6">
            {formatMessage({ id: "inviteModal.title" })}
          </Typography>
          <Flex container center="xs" middle="xs" spacing={20}>
            <Flex grow="xs">
              {myCompanies && (
                <BaseSelect
                  isIntl
                  value={currentCompany}
                  onChange={e => setCurrentCompany(e.target.value)}
                  fullWidth
                  options={myCompanies.filter(({ campaignStatus }) => campaignStatus === "ApprovalListOfBloggers").map(({ name, id }) => ({ value: id, label: name }))}
                  label={formatMessage({ id: "inviteModal.choseCompany" })}
                />
              )}
            </Flex>
            <Flex xs="100%" lg="auto">
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  Http.post(`/ident/v1/advuser/camp/${currentCompany}/invite-blogger/${bloggerId}`)
                    .then(() =>toast.success(formatMessage({ id: "toast.inviteSend" })))
                    .catch(() => toast.error(formatMessage({ id: "toast.inviteError" })));
                }}
              >
                {formatMessage({ id: "action.invite" })}
              </Button>
            </Flex>
          </Flex>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default connectModal({
  name: SEND_INVITE,
  getModalState: (state) => state.modals,
})(InviteModal);

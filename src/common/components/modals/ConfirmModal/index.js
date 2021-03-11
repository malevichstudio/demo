import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useIntl } from "react-intl";
import DialogContent from '@material-ui/core/DialogContent';
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import Flex from "../../global/Flex";
import IconButton from "@material-ui/core/IconButton";

const ConfirmModal = ({
    show,
    hideModal,
    message,
    onConfirm,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <Dialog
        open={show}
        onClose={hideModal}
        maxWidth="md"
      >
        <DialogContent style={{ padding: 20 }}>
          <Flex flex xs="100%">
            <IconButton style={{ margin: "-14px -15px -6px auto"}} onClick={hideModal}>
              <CloseIcon />
            </IconButton>
          </Flex>
          <Typography style={{ marginBottom: 15 }} variant="h6">
            {message}
          </Typography>
          <Flex container center="xs" middle="xs" spacing={20}>
            <Flex>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  hideModal();
                  onConfirm();
                }}
              >{formatMessage({ id: "confirm.yes" })}</Button>
            </Flex>
            <Flex>
              <Button
                variant="contained"
                color="secondary"
                onClick={hideModal}
              >{formatMessage({ id: "confirm.cancel" })}</Button>
            </Flex>
          </Flex>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;

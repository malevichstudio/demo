import React from "react";
import useIntl from "react-intl/lib/src/components/useIntl";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Flex from "common/components/global/Flex";
import BaseSelect from "common/components/global/BaseSelect";
import NumberFormat from "react-number-format";
import useStyles from "./styles";
import { usePersonalBill } from "./viewModel";

const PersonalBill = () => {
  const { formatMessage } = useIntl();
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  const vm = usePersonalBill()
  const { payments, onReplenishmentClick, onWithdrawClick, paymentType, onChangePaymentType, paymentOptions } = vm

  return (
    <div>
      <Flex container marginBottom={20} middle="xs" spacing={20}>
        <Typography variant="h3">
          {formatMessage({ id: "pages.personalBill" })}
        </Typography>

        <Flex
          container
          spacing={20}
          marginBottom={!md}
          lg='auto'
          md='100%'
        >
          <Flex xs='100%' sm='221px'>
            <Button
              variant="contained"
              color="secondary"
              onClick={onReplenishmentClick}
              className={classes.replenishmentButton}
              fullWidth
            >
              {formatMessage({ id: "personalBillPage.replenishment" })}
            </Button>
          </Flex>

          <Flex xs='100%' sm='166px' style={{ marginRight: 'auto' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onWithdrawClick}
              className={classes.withdrawButton}
              fullWidth
            >
              {formatMessage({ id: "personalBillPage.withdraw" })}
            </Button>
          </Flex>

          <Flex xs="100%" sm="300px">
            <BaseSelect
              value={paymentType}
              isIntl
              border
              onChange={onChangePaymentType}
              options={paymentOptions}
              label={formatMessage({ id: "personalBillPage.paymentTypes" })}
            />
          </Flex>
        </Flex>
      </Flex>

      <Typography variant="h5">
        {formatMessage({ id: "personalBillPage.history" })}
      </Typography>

      {md && (
        <div className={classes.topbar}>
          <div className={classes.mainColumn} style={{ justifyContent: "center" }}>{formatMessage({ id: "personalBillPage.paymentType" })}</div>
          <div className={classes.column}>{formatMessage({ id: "personalBillPage.amount" })}</div>
          <div className={classes.column}>{formatMessage({ id: "personalBillPage.beforeTransaction" })}</div>
          <div className={classes.column}>{formatMessage({ id: "personalBillPage.afterTransaction" })}</div>
          <div className={classes.column}>{formatMessage({ id: "personalBillPage.dateAndTime" })}</div>
          <div className={classes.column}>{formatMessage({ id: "personalBillPage.paymentSystem" })}</div>
        </div>
      )}

      {
        payments.map((payment, index) => {
          const isNegativeAmount = Math.sign(payment.amount) === -1

          return (
            <div className={classes.payment} key={index}>
              <div className={classes.mainColumn}>
                <div className={classes.text}>
                  {payment.name}
                </div>
              </div>
              <div className={classes.column}>
                <div className={classes.mobileTitle}>{formatMessage({ id: "personalBillPage.amount" })}</div>
                <Flex center="xs" flex grow="xs" noWordWrap middle="xs" className={`${isNegativeAmount ? classes.negativeAmount : classes.positiveAmount}`}>
                  <NumberFormat displayType={'text'} value={payment.amount} thousandSeparator=" " />&ensp;₽
                </Flex>
              </div>
              <div className={classes.column}>
                <div className={classes.mobileTitle}>{formatMessage({ id: "personalBillPage.beforeTransaction" })}</div>
                <Flex center="xs" flex grow="xs" noWordWrap middle="xs" className={classes.text}>
                  <NumberFormat displayType={'text'} value={payment.beforeTransaction} thousandSeparator=" " />&ensp;₽
                </Flex>
              </div>
              <div className={classes.column}>
                <div className={classes.mobileTitle}>{formatMessage({ id: "personalBillPage.afterTransaction" })}</div>
                <Flex center="xs" flex grow="xs" noWordWrap middle="xs" className={classes.text}>
                  <NumberFormat displayType={'text'} value={payment.afterTransaction} thousandSeparator=" " />&ensp;₽
                </Flex>
              </div>
              <div className={classes.column}>
                <div className={classes.mobileTitle}>{formatMessage({ id: "personalBillPage.dateAndTime" })}</div>
                <Flex center="xs" container spacing={15} middle="xs" column="xs">
                  <Flex className={classes.date}>
                    {payment.date}
                  </Flex>
                  <Flex className={classes.date}>
                    {payment.time}
                  </Flex>
                </Flex>
              </div>
              <div className={classes.column}>
                <div className={classes.mobileTitle}>{formatMessage({ id: "personalBillPage.paymentSystem" })}</div>
                <Flex center="xs" container spacing={15} middle="xs" column="xs">
                  <Flex className={classes.paymentSystem}>{payment.paymentSystem}</Flex>
                </Flex>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default PersonalBill;

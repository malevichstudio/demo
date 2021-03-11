import { useState, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import routes from "common/routes";
import { format } from "../../helpers/DateHelper";


export const usePersonalBill = () => {
  const { push } = useHistory();

  const [paymentType, setPaymentType] = useState('');

  const paymentOptions = []

  const onReplenishmentClick = useCallback(() => push(routes.personalBillReplenishment), [push])
  const onWithdrawClick = useCallback(() => console.log('withdraw'), [])
  const onChangePaymentType = useCallback((event) => setPaymentType(event.target.value), [setPaymentType])


  const tempItem = {
    name: "Оплата за размещение у блогера",
    amount: -100000,
    beforeTransaction: 350000,
    afterTransaction: 250000,
    date: '20.02.2020',
    time: '10:22',
    paymentSystem: "Яндекс.Деньги",
  }

  const tempData = []

  for (let i = 0; i < 10; i++) {
    tempData.push(tempItem)
  }

  const payments = useMemo(() => toPaymentsData(tempData), [tempData])

  return {
    payments,
    onReplenishmentClick,
    onWithdrawClick,
    paymentType,
    onChangePaymentType,
    paymentOptions,
  }
}

const toPaymentsData = (payments) => (
  payments.map((payment) => {

    return {
      name: payment.name,
      amount: payment.amount,
      beforeTransaction: payment.beforeTransaction,
      afterTransaction: payment.afterTransaction,
      date: payment.date,
      time: payment.time,
      paymentSystem: payment.paymentSystem,
    }
  })
)

import { format as fnsFormat } from 'date-fns'
import LSHelper from "./LocalStorageHelper";
import { locales } from "../constants/locales";

export const format = (date, formatStr = 'dd.MM.yyyy') => {
  const locale = LSHelper.getItem('locale') || "ru_RU";
  return fnsFormat(date, formatStr, {
    locale: locales[locale],
  })
};
/** @namespace axios.defaults.headers.common */
/** @namespace process.env.BASE_URL */
/** @namespace process.env.PORT */
import axios from 'axios';
const BaseUrl = process.env.REACT_APP_NAME;

const Http = axios.create({
  baseURL: BaseUrl,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export const setLang = (locale = "ru_RU") => {
  Http.defaults.headers['Accept-Language'] = locale;
};

export const setAuthToken = token => {
  Http.defaults.headers.common['authorization'] = `Bearer ${token}`;
};

export default Http;

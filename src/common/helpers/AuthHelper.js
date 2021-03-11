import Cookies from 'js-cookie';

export const authCheck = () => {
  const isAuth = Cookies.get('token');
  return Boolean(isAuth);
};
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import {
  AUTH_REQUEST,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_ERROR,
  REG_REQUEST,
  REG_REQUEST_SUCCESS,
  REG_REQUEST_ERROR,
  RESET_REQUEST,
  RESET_REQUEST_SUCCESS,
  RESET_REQUEST_ERROR,
  LOGOUT,
  ACTIVATE_REQUEST,
  ACTIVATE_REQUEST_SUCCESS,
  ACTIVATE_REQUEST_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_ERROR,
  REFRESH,
  SET_IS_AUTH,
} from "../../actionTypes/auth";
import Http from "../../../http";

export const auth = (data, onSuccess, onError) => {
  return dispatch => {
    dispatch({ type: AUTH_REQUEST });
    Http.post('/auth/v1/login', data)
      .then(res => {
        const { accountId, role } = res.data.data;
        dispatch({ type: AUTH_REQUEST_SUCCESS, payload: { accountId, role } });
        onSuccess(res.data.data);
      })
      .catch(error => {
        dispatch({ type: AUTH_REQUEST_ERROR, payload: error.response });
        onError();
        toast.error(error?.response?.data?.description);
      })
  }
}

export const setIsAuth = () => ({ type: SET_IS_AUTH });

export const reset = (email, onSuccess) => {
  return dispatch => {
    dispatch({ type: RESET_REQUEST })
    Http.get(`/auth/v1/restore/try/${email}`)
      .then(() => {
        dispatch({ type: RESET_REQUEST_SUCCESS });
        onSuccess();
      })
      .catch(error => {
        dispatch({ type: RESET_REQUEST_ERROR, payload: error.response });
        toast.error(error?.response?.data?.description);
      })
  }
}
export const registration = (data, onSuccess, onError) => {
  return dispatch => {
    dispatch({ type: REG_REQUEST });
    Http.post('/auth/v1/register', data)
      .then(() => {
        dispatch({ type: REG_REQUEST_SUCCESS });
        onSuccess();
      })
      .catch(error => {
        dispatch({ type: REG_REQUEST_ERROR, payload: error.response });
        onError();
        console.log(error)
        toast.error(error?.response?.data?.description);
      })
  }
}
export const activate = (token) => {
  return (dispatch) => {
    dispatch({ type: ACTIVATE_REQUEST });
    Http.put(`/auth/v1/activate/${token}`)
      .then(() => {
        dispatch({ type: ACTIVATE_REQUEST_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: ACTIVATE_REQUEST_ERROR, payload: error.response.data.detail });
      })
  }
}
export const resetPassword = (password, token) => {
  return (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    Http.put(`/auth/v1/restore/${token}/${password}`)
      .then(() => {
        dispatch({ type: RESET_PASSWORD_REQUEST_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: RESET_PASSWORD_REQUEST_ERROR, payload: error?.response?.data?.description });
      })
  }
};
export const refresh = () => ({ type: REFRESH })

export const logout = () => {
  Cookies.remove('token');
  Cookies.remove('accountId');
  Cookies.remove('role');
  return { type: LOGOUT }
}
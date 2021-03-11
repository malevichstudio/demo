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
  ACTIVATE_REQUEST,
  ACTIVATE_REQUEST_SUCCESS,
  ACTIVATE_REQUEST_ERROR,
  LOGOUT,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_ERROR,
  REFRESH,
  SET_IS_AUTH,
} from '../../actionTypes/auth';
import Cookies from "js-cookie";
import { authCheck } from "../../../common/helpers/AuthHelper";

const initialState = {
  loading: false,
  error: false,
  isAuth: false,
  accountId: Cookies.get("accountId"),
  isLogged: Boolean(Cookies.get("token")),
  role: Cookies.get("role"),
  isPasswordReset: false,
};

const authReducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case REFRESH:
      return {
        ...state,
        PasswordReset: false,
      }
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: true,
      }
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case RESET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isPasswordReset: true,
      }
    case RESET_PASSWORD_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        isPasswordReset: true,
        error: payload,
      }
    case RESET_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case RESET_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case RESET_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case ACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ACTIVATE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case ACTIVATE_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        accountId: payload.accountId,
        role: payload.role,
        isLogged: true,
      }
    case AUTH_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case REG_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case REG_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case REG_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        isLogged: false,
      }
    default:
      return state;
  }
};

export default authReducer;

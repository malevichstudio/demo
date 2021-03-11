import {
  GET_ME_REQUEST,
  GET_ME_SUCCESS,
  GET_ME_ERROR,
} from "../../actionTypes/me";
import Http from "../../../http";

export const getMe = () => {
  return (dispatch, getState) => {
    const { auth: { role, accountId }} = getState();
    const url = role === "Blogger"
      ? `/ident/v1/blogger/${accountId}`
      : `/ident/v1/advuser/${accountId}`
    dispatch({ type: GET_ME_REQUEST });
    Http.get(url)
      .then(res => {
        dispatch({ type: GET_ME_SUCCESS, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: GET_ME_ERROR, payload: error.response });
      })
  }
}
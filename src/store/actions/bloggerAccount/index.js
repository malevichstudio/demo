import {
  GET_BLOGGER_INSTAGRAM_REQUEST,
  GET_BLOGGER_INSTAGRAM_SUCCESS,
  GET_BLOGGER_INSTAGRAM_ERROR,
} from "../../actionTypes/bloggerAccount";
import Http from "../../../http";

export const getBloggerInstagram = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_BLOGGER_INSTAGRAM_REQUEST });
    Http.get(`/ident/v1/blogger/account/${id}`)
      .then((res) => {
        dispatch({ type: GET_BLOGGER_INSTAGRAM_SUCCESS, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: GET_BLOGGER_INSTAGRAM_ERROR, payload: error.response });
      })
  }
};

export const deleteBloggerInstagram = () => {
  return (dispatch) => {
    dispatch({ type: GET_BLOGGER_INSTAGRAM_REQUEST });
    Http.delete("/integration/v1/instagram/unlink")
      .then(() => {
        dispatch({ type: GET_BLOGGER_INSTAGRAM_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: GET_BLOGGER_INSTAGRAM_ERROR, payload: error.response });
      })
  }
};
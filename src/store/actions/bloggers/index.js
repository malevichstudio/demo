import Http from "../../../http";
import {
  GET_BLOGGERS_ERROR,
  GET_BLOGGERS_REQUEST,
  GET_BLOGGERS_SUCCESS,
  GET_BLOGGER_ERROR,
  GET_BLOGGER_REQUEST,
  GET_BLOGGER_SUCCESS,
} from "../../actionTypes/bloggers";

export const getBloggers = (page, filter, filterChanged) => {
  return (dispatch, getState) => {
    const { bloggers: { bloggers }} = getState();
    dispatch({ type: GET_BLOGGERS_REQUEST });
    Http.post("/ident/v1/blogger/account/get", {
      filter,
      responseParameters: {
        recordsPerPage: 5,
        page,
      }
    })
    .then(res => {
      console.log(res)
      const payload = filterChanged ? res.data.data : {...bloggers, items: [...bloggers.items, ...res.data.data.items]};
      dispatch({ type: GET_BLOGGERS_SUCCESS, payload });
    })
    .catch(error => {
      dispatch({ type: GET_BLOGGERS_ERROR, payload: error });
    })
  }
}

export const getBlogger = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_BLOGGER_REQUEST });
    Http.get(`/ident/v1/blogger/account/${id}`)
      .then((res) => {
        dispatch({ type: GET_BLOGGER_SUCCESS, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: GET_BLOGGER_ERROR, payload: error.response });
      })
  }
};
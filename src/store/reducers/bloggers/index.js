import {
  GET_BLOGGERS_ERROR,
  GET_BLOGGERS_REQUEST,
  GET_BLOGGERS_SUCCESS,
  GET_BLOGGER_ERROR,
  GET_BLOGGER_REQUEST,
  GET_BLOGGER_SUCCESS,
} from "../../actionTypes/bloggers";

const initialState = {
  loading: false,
  error: false,
  bloggers: {
    items: [],
  },
  blogger: {},
};

const bloggersReducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case GET_BLOGGERS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_BLOGGERS_SUCCESS:
      return {
        ...state,
        loading: false,
        bloggers: payload,
      }
    case GET_BLOGGERS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case GET_BLOGGER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_BLOGGER_SUCCESS:
      return {
        ...state,
        loading: false,
        blogger: payload,
      }
    case GET_BLOGGER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state;
  }
};

export default bloggersReducer;

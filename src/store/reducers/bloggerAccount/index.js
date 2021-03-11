import {
  GET_BLOGGER_INSTAGRAM_REQUEST,
  GET_BLOGGER_INSTAGRAM_SUCCESS,
  GET_BLOGGER_INSTAGRAM_ERROR, GET_BLOGGER_INSTAGRAM_DELETE,
} from '../../actionTypes/bloggerAccount';


const initialState = {
  loading: false,
  error: false,
  data: {},
};

const bloggerAccountReducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case GET_BLOGGER_INSTAGRAM_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_BLOGGER_INSTAGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          instagram: payload,
        },
      }
    case GET_BLOGGER_INSTAGRAM_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case GET_BLOGGER_INSTAGRAM_DELETE:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          instagram: undefined,
        },
      }
    default:
      return state;
  }
};

export default bloggerAccountReducer;

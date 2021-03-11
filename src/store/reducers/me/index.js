import {
  GET_ME_REQUEST,
  GET_ME_SUCCESS,
  GET_ME_ERROR,
} from '../../actionTypes/me';

const initialState = {
  loading: false,
  error: false,
  data: {},
};

const meReducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case GET_ME_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ME_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      }
    case GET_ME_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state;
  }
};

export default meReducer;

import {
  GET_COMPANIES_REQUEST,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_ERROR,
  GET_MY_COMPANIES_REQUEST,
  GET_MY_COMPANIES_SUCCESS,
  GET_MY_COMPANIES_ERROR,
  ADD_COMPANY_REQUEST,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_ERROR,
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_ERROR,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_ERROR,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_ERROR,
  GET_PROFILE_CATEGORIES_REQUEST,
  GET_PROFILE_CATEGORIES_SUCCESS,
  GET_PROFILE_CATEGORIES_ERROR, CLEAR_COMPANY,
  GET_LINKED_BLOGGERS_REQUEST,
  GET_LINKED_BLOGGERS_SUCCESS,
  GET_LINKED_BLOGGERS_ERROR,
} from '../../actionTypes/companies';

const initialState = {
  loading: true,
  error: false,
  companies: {
    items: [],
  },
  myCompanies: [],
  company: {
    bloggers: []
  },
  linkedBloggers: {
    items: [],
  },
  profileCategories: [],
};

const companiesReducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case CLEAR_COMPANY:
      return {
        ...state,
        company: {},
      }
    case GET_LINKED_BLOGGERS_REQUEST:
      return {
        ...state,
      }
    case GET_LINKED_BLOGGERS_SUCCESS:
      return {
        ...state,
        linkedBloggers: payload,
      }
    case GET_LINKED_BLOGGERS_ERROR:
      return {
        ...state,
        error: payload,
      }
    case GET_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: payload,
      }
    case GET_COMPANY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case GET_PROFILE_CATEGORIES_REQUEST:
      return {
        ...state,
      }
    case GET_PROFILE_CATEGORIES_SUCCESS:
      return {
        ...state,
        profileCategories: payload,
      }
    case GET_PROFILE_CATEGORIES_ERROR:
      return {
        ...state,
        error: payload,
      }
    case GET_COMPANIES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_COMPANIES_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: payload,
      }
    case GET_COMPANIES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case ADD_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ADD_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case ADD_COMPANY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }

    case GET_MY_COMPANIES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_MY_COMPANIES_SUCCESS:
      return {
        ...state,
        loading: false,
        myCompanies: payload,
      }
    case GET_MY_COMPANIES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state;
  }
};

export default companiesReducer;

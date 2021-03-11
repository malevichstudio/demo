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
  GET_PROFILE_CATEGORIES_ERROR,
  GET_LINKED_BLOGGERS_REQUEST,
  GET_LINKED_BLOGGERS_SUCCESS,
  GET_LINKED_BLOGGERS_ERROR,
  CLEAR_COMPANY,
} from "../../actionTypes/companies";
import Http from "../../../http";

export const getLinkedBloggers = (page, id , status) => {
  return (dispatch) => {
    dispatch({ type: GET_LINKED_BLOGGERS_REQUEST });
    Http.get(`${status !== undefined ? `/adv/v1/camp/${id}/linked-bloggers` : `/adv/v1/camp/${id}/matched-criteria-bloggers`}`, {
      params: {
        RecordsPerPage: 5,
        Page: page,
        status: status,
      }
    })
      .then(res => {
        dispatch({ type: GET_LINKED_BLOGGERS_SUCCESS, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: GET_LINKED_BLOGGERS_ERROR, payload: error });
      })
  }
}
export const getCompanies = (page, filter, filterChanged) => {
  return (dispatch, getState) => {
    const { companies: { companies }} = getState();
    dispatch({ type: GET_COMPANIES_REQUEST });
    Http.post("/adv/v1/camp/filter", {
      ...filter,
      responseParameters: {
        recordsPerPage: 5,
        page,
      }
    })
      .then(res => {
        const payload = filterChanged ? res.data.data : { ...res.data.data, items: [...companies.items, ...res.data.data.items ]};
        dispatch({ type: GET_COMPANIES_SUCCESS, payload });
      })
      .catch(error => {
        dispatch({ type: GET_COMPANIES_ERROR, payload: error });
      })
  }
}

export const getCompany = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_COMPANY_REQUEST });
    Http.get(`/adv/v1/camp/${id}`)
      .then(res => {
        dispatch({ type: GET_COMPANY_SUCCESS, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: GET_COMPANY_ERROR, payload: error.response });
      })
  }
};

export const getMyCompanies = (archived) => {
  return (dispatch, getState) => {
    const { role } = getState().auth;
    dispatch({ type: GET_MY_COMPANIES_REQUEST });
    const isBlogger = role === "Blogger";
    Http.get(isBlogger ? "/ident/v1/blogger/camp/my" : "/adv/v1/camp/my", {
      params: {
        archived,
      }
    })
      .then(res => {
        dispatch({ type: GET_MY_COMPANIES_SUCCESS, payload: isBlogger ? res.data : res.data.data });
      })
      .catch(error => {
        dispatch({ type: GET_MY_COMPANIES_ERROR, payload: error.response });
      })
  }
};

export const getProfileTypes = () => {
  return (dispatch) => {
    dispatch({ type: GET_PROFILE_CATEGORIES_REQUEST });
    Http.get('/enums/v1/account-category')
      .then(res => {
        dispatch({ type: GET_PROFILE_CATEGORIES_SUCCESS, payload: res.data.data });
      })
      .catch(error => {
        dispatch({ type: GET_PROFILE_CATEGORIES_ERROR, payload: error.response });
      })
  }
};

export const clearCompany = () => ({ type: CLEAR_COMPANY })

export const createCompany = (data, onSuccess, onError) => {
  return (dispatch) => {
    dispatch({ type: ADD_COMPANY_REQUEST });
    Http.post('/adv/v1/camp', data)
      .then(res => {
        dispatch({ type: ADD_COMPANY_SUCCESS, payload: res.data.data });
        onSuccess && onSuccess()
      })
      .catch(error => {
        dispatch({ type: ADD_COMPANY_ERROR, payload: error?.response });
        onError && onError();
      })
  }
}

export const editCompany = (data, id, onSuccess, onError) => {
  return (dispatch) => {
    dispatch({ type: ADD_COMPANY_REQUEST });
    Http.put(`/adv/v1/camp/${id}`, data)
      .then(res => {
        dispatch({ type: ADD_COMPANY_SUCCESS, payload: res.data.data });
        onSuccess && onSuccess()
      })
      .catch(error => {
        dispatch({ type: ADD_COMPANY_ERROR, payload: error?.response });
        onError && onError();
      })
  }
}
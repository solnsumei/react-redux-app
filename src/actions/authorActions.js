import authorApi from '../api/mockAuthorApi';
import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';


export const createAuthor = author => ({
  type: types.CREATE_AUTHOR, author
});

export const loadAuthorSuccess = authors => ({
  type: types.LOAD_AUTHORS_SUCCESS, authors
});

export const createAuthorSuccess = author => ({
  type: types.CREATE_AUTHOR_SUCCESS, author
});

export const updateAuthorSuccess = author => ({
  type: types.UPDATE_AUTHOR_SUCCESS, author
});

export const deleteAuthorSuccess = author => ({
  type: types.DELETE_AUTHOR_SUCCESS, author
});

export const loadAuthors = () => {
  return dispatch => {
    dispatch(beginAjaxCall());
    return authorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
};

export const saveAuthor = (author) => {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return authorApi.saveAuthor(author).then(savedAuthor => {
      author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
        dispatch(createAuthorSuccess(savedAuthor));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
};

export const deleteAuthor = (author) => {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return authorApi.deleteAuthor(author).then(() => {
      dispatch(deleteAuthorSuccess(author))
    })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
};

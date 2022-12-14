import * as TYPES from '../constants';

export const updatePersonalChecklist = (payload) => (dispatch) => {
  dispatch({ type: TYPES.UPDATE_MY_CHECK_LIST, payload });
}

export const deletePersonalChecklist = (payload) => (dispatch) => {
  dispatch({ type: TYPES.DELETE_MY_CHECK_LIST, payload });
}

export const updatePersonalItem = (payload) => (dispatch) => {
  dispatch({ type: TYPES.UPDATE_PERSONAL_ITEM, payload });
}

export const deletePersonalItem = (payload) => (dispatch) => {
  dispatch({ type: TYPES.DELETE_PERSONAL_ITEM, payload });
}

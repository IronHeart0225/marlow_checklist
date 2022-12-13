import * as TYPES from '../constants';

export const updatePersonalChecklist = (payload) => (dispatch) => {
  dispatch({ type: TYPES.UPDATE_MY_CHECK_LIST, payload });
}

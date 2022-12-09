import * as TYPES from '../constants';
import { getDocumentList, setDocumentStatus } from '../../services/checklist-service';

export const getPreDepartureChecklist = () => async (dispatch) => {
  dispatch({ type: TYPES.GET_DOCUMENT_LIST_REQUEST });
  const payload = await getDocumentList();
  dispatch({ type: TYPES.GET_DOCUMENT_LIST_SUCCESS, payload });
}

export const setPreDepartureDocumentStatus = (id, status) => async (dispatch) => {
  const res = await setDocumentStatus(status);
  if (res.code === 200) {
    const payload = { id, status };
    dispatch({ type: TYPES.SET_DOCUMENT_STATUS, payload });
    return { code: res.code, message: res.data.data };
  }
  return res;
}

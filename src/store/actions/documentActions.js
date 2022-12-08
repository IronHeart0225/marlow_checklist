import * as TYPES from '../constants';
import { getDocumentList } from '../../services/checklist-service';

export const getPreDepartureChecklist = () => async (dispatch) => {
  dispatch({ type: TYPES.GET_DOCUMENT_LIST_REQUEST });
  const data = await getDocumentList();
  dispatch({ type: TYPES.GET_DOCUMENT_LIST_SUCCESS, data });
}

import * as TYPES from '../constants';

export const documents = (state = {}, action) => {
  switch (action.type) {
    case TYPES.GET_DOCUMENT_LIST_REQUEST:
      return {
        ...state,
        type: action.type,
      }
    case TYPES.GET_DOCUMENT_LIST_SUCCESS:
      return {
        ...state,
        type: action.type,
        document: {
          ...action.data,
          total: action.data.items?.length ?? 0,
        }
      }
    default:
      return state;
  }
}

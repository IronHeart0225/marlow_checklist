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
          ...action.payload,
          total: action.payload.items?.length ?? 0,
        }
      }
    case TYPES.SET_DOCUMENT_STATUS:
      const { document } = state;
      const { items } = document;
      const newItems = items.map(item => 
        item.id === action.payload.id ? { ...item, status: action.payload.status } : item);
      const percentage = newItems.reduce((total, item) => total + (item.status !== 'Pending'), 0);
      return {
        ...state,
        type: action.type,
        document: { ...document, items: newItems, percentage },
      }
    default:
      return state;
  }
}

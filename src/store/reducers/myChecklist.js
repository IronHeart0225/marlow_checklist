import moment from 'moment';
import * as TYPES from '../constants';

export const myChecklist = (state = [], action) => {
  switch (action.type) {
    case TYPES.UPDATE_MY_CHECK_LIST:
      if (state.find(p => p.id === action.payload.id)) {
        return state.map(p => p.id === action.payload.id ? action.payload : p);
      }
      return [...state, {
        ...action.payload,
        created: moment().format('DD.MM.YY'),
      }];
    default:
      return state;
  }
}

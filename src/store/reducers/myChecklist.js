import moment from 'moment';
import * as TYPES from '../constants';

export const myChecklist = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.UPDATE_MY_CHECK_LIST:
      if (state.find(p => p.id === payload.id)) {
        return state.map(p => p.id === payload.id ? payload : p);
      }
      return [...state, {
        ...payload,
        created: moment().format('DD.MM.YY'),
      }];
    case TYPES.DELETE_MY_CHECK_LIST:
      if (state.find(p => p.id === payload.id)) {
        return state.filter(p => p.id !== payload.id);
      }
      return state;
    case TYPES.UPDATE_PERSONAL_ITEM:
      return state.map(p => {
        if (p.id === payload.id) {
          const newItems = p.items.map((item, index) => index === payload.index ? { ...item, done: payload.done } : item);
          return {
            ...p,
            items: newItems,
          }
        } else {
          return p;
        }
      });
    case TYPES.DELETE_PERSONAL_ITEM:
      return state.map(p => {
        if (p.id === payload.id) {
          const newItems = p.items.filter((_, index) => index !== payload.index);
          return {
            ...p,
            items: newItems,
          }
        } else {
          return p;
        }
      });
    default:
      return state;
  }
}

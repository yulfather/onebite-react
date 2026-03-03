import { useCallback } from 'react';

export function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATETODO':
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item,
      );
    case 'DELETE':
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

export const useActionDispatch = ({ type, dispatch, buildAction }) => {
  return useCallback(
    (...args) => {
      dispatch({
        type,
        ...buildAction(...args),
      });
    },
    [type, dispatch, buildAction],
  );
};

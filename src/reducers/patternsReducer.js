import { PATTERNS_LOAD_SUCCESS } from '../constants/actionTypes';

import initialState from './initialState';

export default function patternsReducer(state = initialState.patterns, action) {
  switch (action.type) {
    case PATTERNS_LOAD_SUCCESS: {
      return state;
    }

    default: {
      return state;
    }
  }
}

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import pattern from './patternReducer';
import patterns from './patternsReducer';

const rootReducer = combineReducers({
  pattern,
  patterns,
  routing: routerReducer
});

export default rootReducer;

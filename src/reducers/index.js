import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import pattern from './patternReducer';
import gallery from './galleryReducer';

const rootReducer = combineReducers({
  pattern,
  gallery,
  routing: routerReducer
});

export default rootReducer;

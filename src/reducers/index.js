import { combineReducers } from 'redux';
import editor from './editorReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  editor,
  routing: routerReducer
});

export default rootReducer;

import { fetchPatterns } from '../services/api';

import * as types from '../constants/actionTypes';
import {
  PATTERNS_LOAD,
  PATTERNS_LOAD_SUCCESS,
  PATTERNS_LOAD_FAIL
} from '../constants/actionTypes';

///////////////////////////////////////
//
// PRIVATE METHODS

function loadPatterns() {
  return {
    type: PATTERNS_LOAD
  };
}

function patternsLoadSuccess(patterns) {
  return {
    type: PATTERNS_LOAD_SUCCESS,
    patterns: patterns
  };
}

function patternsLoadFail() {
  return {
    type: PATTERNS_LOAD_FAIL
  };
}

///////////////////////////////////////
//
// ACTIONS

export function getPatterns() {
  return function(dispatch) {
    dispatch(loadPatterns());

    return fetchPatterns.then(patterns =>
      dispatch(patternsLoadSucess(patterns))
    );
  };
}

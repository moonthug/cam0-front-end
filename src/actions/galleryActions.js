import { setPattern } from './patternActions';

import { fetchPatterns } from '../services/api';

import {
  GALLERY_LOAD_PATTERNS,
  GALLERY_LOAD_PATTERNS_SUCCESS,
  GALLERY_LOAD_PATTERNS_FAIL,
  GALLERY_SET_PATTERN_SELECTED
} from '../constants/actionTypes';

///////////////////////////////////////
//
// PRIVATE METHODS

function _loadPatterns() {
  return {
    type: GALLERY_LOAD_PATTERNS
  };
}

function _patternsLoadSuccess(patterns) {
  return {
    type: GALLERY_LOAD_PATTERNS_SUCCESS,
    patterns
  };
}

function _patternsLoadFail(err) {
  return {
    type: GALLERY_LOAD_PATTERNS_FAIL
  };
}

function _selectPattern(patternId) {
  return {
    type: GALLERY_SET_PATTERN_SELECTED,
    patternId
  };
}

///////////////////////////////////////
//
// ACTIONS

export function loadPatterns() {
  return function(dispatch) {
    dispatch(_loadPatterns());

    return fetchPatterns()
      .then(patterns => {
        dispatch(_patternsLoadSuccess(patterns));
      })
      .catch(err => {
        dispatch(_patternsLoadFail(err));
      });
  };
}

export function selectPattern(patternId) {
  return function(dispatch, getState) {
    let pattern;
    getState().gallery.patterns.forEach(p => {
      if (p.id === patternId) {
        pattern = p;
      }
    });

    dispatch(_selectPattern(patternId));
    return dispatch(setPattern(pattern));
  };
}

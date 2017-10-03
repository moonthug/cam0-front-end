import {
  GALLERY_LOAD_PATTERNS,
  GALLERY_LOAD_PATTERNS_FAIL,
  GALLERY_LOAD_PATTERNS_SUCCESS,
  GALLERY_SET_PATTERN_SELECTED
} from '../constants/actionTypes';

import initialState from './initialState';

export default function galleryReducer(state = initialState.gallery, action) {
  switch (action.type) {
    case GALLERY_LOAD_PATTERNS: {
      return { ...state, isLoading: true };
    }

    case GALLERY_LOAD_PATTERNS_FAIL: {
      return { ...state, isLoading: false };
    }

    case GALLERY_LOAD_PATTERNS_SUCCESS: {
      return { ...state, isLoading: false, patterns: action.patterns };
    }

    case GALLERY_SET_PATTERN_SELECTED: {
      if (typeof action.patternId !== 'string') return state;

      let newPatterns = state.patterns.map(pattern => {
        let newPattern = { ...pattern };
        newPattern.selected = pattern.id === action.patternId;
        return newPattern;
      });

      return {
        ...state,
        patterns: newPatterns
      };
    }

    default: {
      return state;
    }
  }
}

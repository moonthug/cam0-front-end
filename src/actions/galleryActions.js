import * as types from '../constants/actionTypes';

///////////////////////////////////////
//
// ACTIONS

export function getGallery() {
  return function(dispatch) {
    return dispatch({
      type: types.GALLERY_LOAD
    });
  };
}

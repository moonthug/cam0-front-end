import * as types from '../constants/actionTypes';

export function createLayer() {
  return function (dispatch) {
    return dispatch({
      type: types.EDITOR_CREATE_LAYER
    });
  };
}

export function updateLayer(update) {
  return function (dispatch) {
    return dispatch({
      type: types.EDITOR_UPDATE_LAYER,
      update
    });
  };
}

export function deleteLayer(layerId) {
  return function (dispatch) {
    return dispatch({
      type: types.EDITOR_DELETE_LAYER,
      layerId
    });
  };
}

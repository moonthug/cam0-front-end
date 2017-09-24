import * as types from '../constants/actionTypes';


export function updateSetting(update) {
  return function (dispatch) {
    return dispatch({
      type: types.EDITOR_UPDATE_SETTING,
      update
    });
  };
}


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

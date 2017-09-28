import * as types from '../constants/actionTypes';

import defaultLayer from '../constants/defaults/layer';

///////////////////////////////////////
//
// PRIVATE METHODS

function _createLayer(fromLayer) {
  fromLayer = fromLayer || defaultLayer;

  return {
    type: types.EDITOR_CREATE_LAYER,
    newLayer: {
      ...fromLayer,
      noiseSeed: Math.random() * 1000000
    }
  };
}

///////////////////////////////////////
//
// ACTIONS

export function updateSetting(update) {
  return function(dispatch) {
    return dispatch({
      type: types.EDITOR_UPDATE_SETTING,
      update
    });
  };
}

export function createLayer() {
  return function(dispatch) {
    return dispatch(_createLayer());
  };
}

export function updateLayer(update) {
  return function(dispatch) {
    return dispatch({
      type: types.EDITOR_UPDATE_LAYER,
      update
    });
  };
}

export function duplicateLayer(layerId) {
  return function(dispatch, getState) {
    let duplicate = null;
    getState().editor.layers.forEach(layer => {
      if (layer.id === layerId) {
        duplicate = layer;
      }
    });

    return dispatch(_createLayer(duplicate));
  };
}

export function deleteLayer(layerId) {
  return function(dispatch) {
    return dispatch({
      type: types.EDITOR_DELETE_LAYER,
      layerId
    });
  };
}

// export function setTheme(themeId) {
//   return function (dispatch) {
//     return dispatch({
//       type: types.EDITOR_SET_THEME,
//       newLayer: _createLayer(fromLayer)
//     });
//   };
// }

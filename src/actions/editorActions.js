// @flow

import * as types from '../constants/actionTypes';

import defaultLayer from '../constants/defaults/layer';

// eslint-disable-next-line import/named
import type {
  GetState,
  ThunkAction,
  Layer,
  Editor_SettingUpdate,
  Editor_LayerUpdate,
  Editor_ResetDrawForLayers_Action,
  Editor_CreateLayer_Action,
  Editor_DeleteLayer_Action,
  Editor_UpdateLayer_Action,
  Editor_UpdateSetting_Action
  // eslint-disable-next-line import/no-unresolved
} from 'cam0';

///////////////////////////////////////
//
// PRIVATE METHODS

function _createLayer(fromLayer: ?Layer): Layer {
  fromLayer = fromLayer || defaultLayer;

  return {
    ...fromLayer,
    draw: true, // always override draw
    noiseSeed: Math.floor(Math.random() * 1000000)
  };
}

///////////////////////////////////////
//
// ACTIONS

export function resetDrawForLayers(): ThunkAction {
  return function(dispatch: Dispatch<Editor_ResetDrawForLayers_Action>) {
    return dispatch({
      type: types.EDITOR_RESET_DRAW_FOR_LAYERS
    });
  };
}

export function updateSetting(update: Editor_SettingUpdate): ThunkAction {
  return function(dispatch: Dispatch<Editor_UpdateSetting_Action>) {
    return dispatch({
      type: types.EDITOR_UPDATE_SETTING,
      ...update
    });
  };
}

export function createLayer(): ThunkAction {
  return function(dispatch: Dispatch<Editor_CreateLayer_Action>) {
    return dispatch({
      type: types.EDITOR_CREATE_LAYER,
      newLayer: _createLayer()
    });
  };
}

export function updateLayer(update: Editor_LayerUpdate): ThunkAction {
  return function(dispatch: Dispatch<Editor_UpdateLayer_Action>) {
    return dispatch({
      type: types.EDITOR_UPDATE_LAYER,
      ...update
    });
  };
}

export function duplicateLayer(layerId: number): ThunkAction {
  return function(
    dispatch: Dispatch<Editor_CreateLayer_Action>,
    getState: GetState
  ) {
    let duplicate: Layer;
    getState().editor.layers.forEach(layer => {
      if (layer.id === layerId) {
        duplicate = layer;
      }
    });

    return dispatch({
      type: types.EDITOR_CREATE_LAYER,
      newLayer: _createLayer(duplicate)
    });
  };
}

export function deleteLayer(layerId: number): ThunkAction {
  return function(dispatch: Dispatch<Editor_DeleteLayer_Action>) {
    return dispatch({
      type: types.EDITOR_DELETE_LAYER,
      layerId
    });
  };
}

// export function setTheme(themeId :number) {
//   return function (dispatch :Dispatch) {
//     return dispatch({
//       type: types.EDITOR_SET_THEME,
//       newLayer: _createLayer(fromLayer)
//     });
//   };
// }

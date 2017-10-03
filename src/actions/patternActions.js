// @flow

import * as types from '../constants/actionTypes';

import defaultLayer from '../constants/defaults/layer';

// eslint-disable-next-line import/named
import type {
  GetState,
  ThunkAction,
  Layer,
  BasicAction,
  State,
  Pattern_SettingUpdate,
  Pattern_LayerUpdate,
  Pattern_CreateLayer_Action,
  Pattern_CreateLayers_Action,
  Pattern_DeleteLayer_Action,
  Pattern_UpdateLayer_Action,
  Pattern_UpdateSetting_Action
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
    noiseSeed: Math.floor(Math.random() * 1000000),
    color: ['#ffcc00', '#ccff00', '#cc00ff', '#00ffcc', '#eeeeee'][
      Math.floor(Math.random() * 5)
    ],
    thresholdMin: 0.3 + Math.random() * 0.2,
    thresholdMax: 0.7 + Math.random() * 0.3,
    amplitude: 0.5 + Math.random(),
    frequency: 100 + Math.random() * 400
  };
}

///////////////////////////////////////
//
// ACTIONS

export function setPattern(pattern: Pattern): ThunkAction {
  return function(dispatch: Dispatch<Pattern_SetLayer_Action>) {
    return dispatch({
      type: types.PATTERN_SET_PATTERN,
      pattern
    });
  };
}

export function updateSetting(update: Pattern_SettingUpdate): ThunkAction {
  return function(dispatch: Dispatch<Pattern_UpdateSetting_Action>) {
    return dispatch({
      type: types.PATTERN_UPDATE_SETTING,
      ...update
    });
  };
}

export function reSeedLayers(): ThunkAction {
  return (dispatch: Dispatch<BasicAction>) => {
    return dispatch({
      type: types.PATTERN_RE_SEED_LAYERS
    });
  };
}

export function resetDrawForLayers(): ThunkAction {
  return (dispatch: Dispatch<BasicAction>) => {
    return dispatch({
      type: types.PATTERN_RESET_DRAW_FOR_LAYERS
    });
  };
}

export function createLayer(): ThunkAction {
  return (dispatch: Dispatch<Pattern_CreateLayer_Action>) => {
    return dispatch({
      type: types.PATTERN_CREATE_LAYER,
      newLayer: _createLayer()
    });
  };
}

export function createLayers(count: number): ThunkAction {
  return (dispatch: Dispatch<Pattern_CreateLayers_Action>) => {
    let layers: Array<Layer> = [];
    for (let i: number = 0; i < count; i++) {
      layers.push(_createLayer());
    }
    return dispatch({
      type: types.PATTERN_CREATE_LAYERS,
      newLayers: layers
    });
  };
}

export function updateLayer(update: Pattern_LayerUpdate): ThunkAction {
  return (dispatch: Dispatch<Pattern_UpdateLayer_Action>) => {
    return dispatch({
      type: types.PATTERN_UPDATE_LAYER,
      ...update
    });
  };
}

export function duplicateLayer(layerId: number): ThunkAction {
  return (
    dispatch: Dispatch<Pattern_CreateLayer_Action>,
    getState: GetState
  ) => {
    let duplicate: Layer;
    getState().pattern.layers.forEach(layer => {
      if (layer.id === layerId) {
        duplicate = layer;
      }
    });

    return dispatch({
      type: types.PATTERN_CREATE_LAYER,
      newLayer: _createLayer(duplicate)
    });
  };
}

export function deleteLayer(layerId: number): ThunkAction {
  return (dispatch: Dispatch<Pattern_DeleteLayer_Action>) => {
    return dispatch({
      type: types.PATTERN_DELETE_LAYER,
      layerId
    });
  };
}

// export function setTheme(themeId :number) {
//   return (dispatch :Dispatch) => {
//     return dispatch({
//       type: types.PATTERN_SET_THEME,
//       newLayer: _createLayer(fromLayer)
//     });
//   };
// }

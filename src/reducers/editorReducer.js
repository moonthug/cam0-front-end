import {
  EDITOR_UPDATE_SETTING,
  EDITOR_CREATE_LAYER,
  EDITOR_DELETE_LAYER,
  EDITOR_UPDATE_LAYER
} from '../constants/actionTypes';

import initialState from './initialState';

import defaultLayer from '../constants/defaults/layer';

export default function editorReducer(state = initialState.editor, action) {
  switch (action.type) {

    case EDITOR_UPDATE_SETTING: {
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.update.key]: action.update.value
        }
      };
    }

    case EDITOR_CREATE_LAYER: {
      let layerId = state.layerInc + 1;
      let newLayer = {
        ...defaultLayer,
        id: layerId,
        noiseSeed: Math.random() * 32767,
      };

      return {
        ...state,
        layerInc: layerId,
        layers: [...state.layers, newLayer]
      };
    }

    case EDITOR_UPDATE_LAYER: {
      return {
        ...state,
        layers: state.layers.map(layer => {
          let newLayer = Object.assign({}, layer);
          if (layer.id === action.update.layerId) {
            newLayer[action.update.key] = action.update.value;
          }
          return newLayer;
        })
      };
    }

    case EDITOR_DELETE_LAYER: {
      return {
        ...state,
        layers: state.layers.filter(layer => {
          return layer.id !== action.layerId;
        })
      };
    }

    default: {
      return state;
    }
  }
}

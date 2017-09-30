// @flow

import {
  EDITOR_RESET_DRAW_FOR_LAYERS,
  EDITOR_UPDATE_SETTING,
  EDITOR_CREATE_LAYER,
  EDITOR_DELETE_LAYER,
  EDITOR_UPDATE_LAYER
} from '../constants/actionTypes';

import initialState from './initialState';

// eslint-disable-next-line import/no-unresolved
import type { EditorState, EditorAction } from 'cam0';

export default function editorReducer(
  state: EditorState = initialState.editor,
  action: EditorAction
): EditorState {
  switch (action.type) {
    case EDITOR_RESET_DRAW_FOR_LAYERS: {
      return {
        ...state,
        layers: state.layers.map((layer: Layer) => {
          return { ...layer, draw: false };
        })
      };
    }

    case EDITOR_UPDATE_SETTING: {
      if (typeof action.key !== 'string') return state;
      if (typeof action.value === 'undefined') return state;

      return {
        ...state,
        settings: {
          ...state.settings,
          draw: true,
          [action.key]: action.value
        }
      };
    }

    case EDITOR_CREATE_LAYER: {
      if (typeof action.newLayer === 'undefined') return state;
      let layers = state.layers.map((layer, i) => {
        let newLayer = Object.assign({}, layer);
        newLayer.id = i;
        return newLayer;
      });
      layers.push({ ...action.newLayer, id: layers.length });

      return {
        ...state,
        layers
      };
    }

    case EDITOR_UPDATE_LAYER: {
      if (typeof action.layerId !== 'number') return state;
      if (typeof action.key !== 'string') return state;
      if (typeof action.value === 'undefined') return state;

      let newLayers = state.layers.map((layer: Layer) => {
        let newLayer = { ...layer };

        if (layer.id === action.layerId) {
          newLayer[action.key] = action.value;
          newLayer.draw = action.draw;
        }
        return newLayer;
      });

      return {
        ...state,
        layers: newLayers
      };
    }

    case EDITOR_DELETE_LAYER: {
      return {
        ...state,
        layers: state.layers.filter((layer: Layer) => {
          return layer.id !== action.layerId;
        })
      };
    }

    default: {
      return state;
    }
  }
}

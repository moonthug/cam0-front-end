// @flow

import {
  PATTERN_UPDATE_SETTING,
  PATTERN_RESET_DRAW_FOR_LAYERS,
  PATTERN_CREATE_LAYER,
  PATTERN_CREATE_LAYERS,
  PATTERN_DELETE_LAYER,
  PATTERN_UPDATE_LAYER,
  PATTERN_RE_SEED_LAYERS,
  PATTERN_SET_PATTERN
} from '../constants/actionTypes';

import initialState from './initialState';

// eslint-disable-next-line import/no-unresolved
import type { Pattern, PatternAction, Layer } from 'cam0';

export default function patternReducer(
  state: Pattern = initialState.pattern,
  action: PatternAction
): Pattern {
  switch (action.type) {
    case PATTERN_SET_PATTERN: {
      if (typeof action.pattern === 'undefined') return state;

      action.pattern.layers = action.pattern.layers.map(layer => {
        return { ...layer, draw: true };
      });

      return { ...state, ...action.pattern };
    }

    case PATTERN_UPDATE_SETTING: {
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

    case PATTERN_RESET_DRAW_FOR_LAYERS: {
      return {
        ...state,
        layers: state.layers.map((layer: Layer) => {
          return { ...layer, draw: false };
        })
      };
    }

    case PATTERN_RE_SEED_LAYERS: {
      return {
        ...state,
        layers: state.layers.map((layer: Layer) => {
          // TODO: Move the random number calc to the pattern action
          return {
            ...layer,
            noiseSeed: Math.floor(Math.random() * 1000000),
            draw: true
          };
        })
      };
    }

    case PATTERN_CREATE_LAYER: {
      if (typeof action.newLayer === 'undefined') return state;
      let layers = state.layers.map((layer, i) => {
        let newLayer = { ...layer };
        newLayer.id = i;
        return newLayer;
      });
      layers.push({ ...action.newLayer, id: layers.length });

      return {
        ...state,
        layers
      };
    }

    case PATTERN_CREATE_LAYERS: {
      if (typeof action.newLayers === 'undefined') return state;
      if (!Array.isArray(action.newLayers)) return state;

      let newLayers = [...state.layers, ...action.newLayers];
      newLayers = newLayers.map((layer, i) => {
        let newLayer = { ...layer };
        newLayer.id = i;
        return newLayer;
      });
      return {
        ...state,
        layers: newLayers
      };
    }

    case PATTERN_UPDATE_LAYER: {
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

    case PATTERN_DELETE_LAYER: {
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

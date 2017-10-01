// @flow

// eslint-disable-next-line import/named
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

declare module 'cam0' {
  /////////////////////////////////////////////////////////////////////////////////////////
  //
  // DATA
  //

  ///////////////////////////////////////
  //
  // STATE

  declare type State = {
    editor: PatternState
  };

  //
  // Editor

  declare type PatternState = {
    layers: Array<Layer>,
    settings: PatternSettings
  };

  declare type PatternSettings = {
    backgroundColor: string,
    blendMode: string,
    blur: boolean,
    blurAmount: number
  };

  //
  // Patterns

  declare type PatternsState = {
    currentPage: number
  };

  ///////////////////////////////////////
  //
  // LAYER

  declare type Layer = {
    id: number,
    draw: boolean,
    noiseSeed: number,
    color: string,
    alpha: number,
    thresholdMin: number,
    thresholdMax: number,
    blendMode: string,
    frequency: number,
    amplitude: number
  };

  /////////////////////////////////////////////////////////////////////////////////////////
  //
  // REDUX
  //

  declare type Store = ReduxStore<State, Action>;

  declare type GetState = () => State;
  declare type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
  declare type Dispatch = ReduxDispatch<Action> &
    ((action: ThunkAction) => void);

  ///////////////////////////////////////
  //
  // ACTIONS

  declare type BasicAction = {
    type: string
  };

  //
  // EDITOR

  declare type Pattern_UpdateSetting_Action = {
    type: string,
    ...Pattern_SettingUpdate
  };

  declare type Pattern_CreateLayer_Action = {
    type: string,
    newLayer: Layer
  };

  declare type Pattern_CreateLayers_Action = {
    type: string,
    newLayers: Array<Layer>
  };

  declare type Pattern_UpdateLayer_Action = {
    type: string,
    ...Pattern_LayerUpdate
  };

  declare type Pattern_DeleteLayer_Action = {
    type: string,
    layerId: number
  };

  declare type PatternAction =
    | Pattern_UpdateSetting_Action
    | Pattern_CreateLayer_Action
    | Pattern_CreateLayers_Action
    | Pattern_UpdateLayer_Action
    | Pattern_DeleteLayer_Action;

  declare type Pattern_LayerUpdate = {
    layerId: number,
    key: string,
    value: any,
    draw?: boolean
  };

  declare type Pattern_SettingUpdate = {
    key: string,
    value: any
  };

  //
  // ALL

  declare type Action = BasicAction | PatternAction;
}

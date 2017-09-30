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
    editor: EditorState
  };

  //
  // Editor

  declare type EditorState = {
    layers: Array<Layer>,
    settings: EditorSettings
  };

  declare type EditorSettings = {
    backgroundColor: string,
    blendMode: string,
    blur: boolean,
    blurAmount: number
  };

  //
  // Gallery

  declare type GalleryState = {
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

  //
  // EDITOR

  declare type Editor_ResetDrawForLayers_Action = {
    type: string
  };

  declare type Editor_UpdateSetting_Action = {
    type: string,
    ...Editor_SettingUpdate
  };

  declare type Editor_CreateLayer_Action = {
    type: string,
    newLayer: Layer
  };

  declare type Editor_UpdateLayer_Action = {
    type: string,
    ...Editor_LayerUpdate
  };

  declare type Editor_DeleteLayer_Action = {
    type: string,
    layerId: number
  };

  declare type EditorAction =
    | Editor_UpdateSetting_Action
    | Editor_CreateLayer_Action
    | Editor_UpdateLayer_Action
    | Editor_DeleteLayer_Action;

  declare type Editor_LayerUpdate = {
    layerId: number,
    key: string,
    value: any,
    draw?: boolean
  };

  declare type Editor_SettingUpdate = {
    key: string,
    value: any
  };

  //
  // ALL

  declare type Action = EditorAction;
}

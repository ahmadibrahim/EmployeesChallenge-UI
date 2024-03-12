import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IAppState } from "@/types/global/types";

export const SET_GLOBAL_MESSAGE = "APP_SET_GLOBAL_MESSAGE";

export const INITIAL_STATE: IAppState = {
  message: null,
  status: null
};

export const appSlice = createSlice({
  name: "app",
  initialState: INITIAL_STATE,
  reducers: {
    setMessageStatus: (state, action: PayloadAction<IAppState>) => {
      state.message = action.payload.message || null;
      state.status = action.payload.status || null;
    }
  },
  selectors: {
    selectMessageState: state => ({
      message: state.message,
      status: state.status
    })
  }
});

export const { setMessageStatus } = appSlice.actions;

export const { selectMessageState } = appSlice.selectors;

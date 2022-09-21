import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOfflineAsyncThunk = (
  typePrefix,
  payloadCreator,
  options
) => {
  const thunk = createAsyncThunk(
    typePrefix,
    payloadCreator,
    options?.asyncOptions
  );

  return Object.assign((arg) => {
    return Object.assign(thunk(arg), thunk, options?.offlineOptions || {}, {
      meta: {
        ...(options?.offlineOptions?.meta || {}),
        name: typePrefix,
        args: [arg],
      },
    });
  }, thunk);
};

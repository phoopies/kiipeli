// import { createAsyncThunk } from '@reduxjs/toolkit';

// // eslint-disable-next-line import/prefer-default-export
// export const createOfflineAsyncThunk = (
//   typePrefix,
//   payloadCreator,
//   options
// ) => {
//   const thunk = createAsyncThunk(
//     typePrefix,
//     payloadCreator,
//     options.asyncOptions
//   );

//   return Object.assign((arg) => {
//     return Object.assign(thunk(arg), thunk, options.offlineOptions || {}, {
//       meta: {
//         ...(options.offlineOptions.meta || {}),
//         name: typePrefix,
//         args: [arg],
//       },
//     });
//   }, thunk);
// };

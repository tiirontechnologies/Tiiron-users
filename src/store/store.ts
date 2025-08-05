import { configureStore } from "@reduxjs/toolkit";
import { api, authApi } from "../api/api";
import globalIdReducer from "../slices/globalid.slice";
import loginFormReducer from "../slices/login.slice";

export const store = configureStore({
  reducer: {
    globalIdSlice: globalIdReducer,
    loginFormSlice: loginFormReducer,
    [authApi.reducerPath]: authApi.reducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

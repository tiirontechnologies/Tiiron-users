import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../api/api'
import globalIdReducer from '../slices/globalid.slice'
export const store = configureStore({
    reducer: {
        globalIdSlice: globalIdReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
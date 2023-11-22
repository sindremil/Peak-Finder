import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import filterReducer from "./features/Filter/filterSlice";
import searchReducer from "./features/Searchbar/searchSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    search: searchReducer,
  },
});

const rootReducer = combineReducers({
  filter: filterReducer,
  search: searchReducer,
});

export default store;

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof setupStore>;

import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./components/Filter/filterSlice";
import searchReducer from "./components/Searchbar/searchSlice"
const store = configureStore({
  reducer: {
    filter: filterReducer,
    search: searchReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

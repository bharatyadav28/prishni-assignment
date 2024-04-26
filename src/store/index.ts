import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import productSlice from "./productSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    orders: orderSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;

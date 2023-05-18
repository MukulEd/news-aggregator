import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "@/features/article/articleSlice.js";

export default configureStore({
  reducer: {
    article: articleReducer,
  },
});

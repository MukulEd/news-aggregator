import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axios.js";

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: {
      loading: "idle",
      data: [],
      error: null,
    },
    categories: {
      loading: "idle",
      data: [],
      error: null,
    },
    sources: {
      loading: "idle",
      data: [],
      error: null,
    },
    authors: {
      loading: "idle",
      data: [],
      error: null,
    },
    filters: {
      sources: [],
      categories: [],
      authors: [],
      startDate: null,
      endDate: null,
    },
    value: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticles.pending, (state, action) => {
      if (state.articles.loading === "idle") {
        state.articles.loading = "pending";
      }
    });
    builder.addCase(getArticles.fulfilled, (state, action) => {
      if (state.articles.loading === "pending") {
        state.articles.data = action.payload.data.articles;
        state.articles.loading = "idle";
      }
    });
    builder.addCase(getArticles.rejected, (state, action) => {
      console.log(action, "error");
      if (state.articles.loading === "pending") {
        state.articles.loading = "idle";
        state.articles.error = "Error occured";
      }
    });
  },
});

export const getArticles = createAsyncThunk(
  "article/getArticles",
  async (arg, { getState }) => {
    const state = getState();
    const response = await axios.get("/articles");
    return response.data;
  }
);

export default articleSlice.reducer;

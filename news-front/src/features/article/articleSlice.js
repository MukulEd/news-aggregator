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
  },
  reducers: {
    setFilterData: (state, action) => {
      switch (action.payload.actionType) {
        case "categories":
        case "sources":
        case "authors":
          state.filters[action.payload.actionType] = action.payload.data.map(
            (pt) => pt.id
          );
          break;
        case "date":
          state.filters.startDate = action.payload.data.startDate;
          state.filters.endDate = action.payload.data.endDate;
          break;
      }
    },
  },
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
    //////////////////// categories////////////////////
    builder.addCase(getCategories.pending, (state, action) => {
      if (state.categories.loading === "idle") {
        state.categories.loading = "pending";
      }
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      if (state.categories.loading === "pending") {
        state.categories.data = action.payload.data.categories;
        state.categories.loading = "idle";
      }
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      console.log(action, "error");
      if (state.categories.loading === "pending") {
        state.categories.loading = "idle";
        state.categories.error = "Error occured";
      }
    });
    ///////////////// authors //////////////
    builder.addCase(getAuthors.pending, (state, action) => {
      if (state.authors.loading === "idle") {
        state.authors.loading = "pending";
      }
    });
    builder.addCase(getAuthors.fulfilled, (state, action) => {
      if (state.authors.loading === "pending") {
        state.authors.data = action.payload.data.authors;
        state.authors.loading = "idle";
      }
    });
    builder.addCase(getAuthors.rejected, (state, action) => {
      console.log(action, "error");
      if (state.authors.loading === "pending") {
        state.authors.loading = "idle";
        state.authors.error = "Error occured";
      }
    });
    ///////////////// sources //////////////
    builder.addCase(getSources.pending, (state, action) => {
      if (state.sources.loading === "idle") {
        state.sources.loading = "pending";
      }
    });
    builder.addCase(getSources.fulfilled, (state, action) => {
      if (state.sources.loading === "pending") {
        state.sources.data = action.payload.data.sources;
        state.sources.loading = "idle";
      }
    });
    builder.addCase(getSources.rejected, (state, action) => {
      console.log(action, "error");
      if (state.sources.loading === "pending") {
        state.sources.loading = "idle";
        state.sources.error = "Error occured";
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

export const getCategories = createAsyncThunk(
  "article/getCategories",
  async () => {
    const response = await axios.get("/categories");
    return response.data;
  }
);

export const getSources = createAsyncThunk("article/getSources", async () => {
  const response = await axios.get("/sources");
  return response.data;
});

export const getAuthors = createAsyncThunk("article/getAuthors", async () => {
  const response = await axios.get("/authors");
  return response.data;
});

export const { setFilterData } = articleSlice.actions;
export default articleSlice.reducer;

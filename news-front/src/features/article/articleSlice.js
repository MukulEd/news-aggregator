import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axios.js";

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: {
      loading: "idle",
      data: [],
      error: null,
      scrollLoading: false,
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
      page: 1,
      keyword: "",
    },
  },
  reducers: {
    setFilterData: (state, action) => {
      state.filters = { ...state.filters, ...action.payload, page: 1 };
      //reset articles
      state.articles.data = [];
    },
    clearFilter: (state) => {
      state.filters.sources = [];
      state.filters.categories = [];
      state.filters.authors = [];
      state.startDate = null;
      state.endDate = null;
    },
    incrementPage: (state) => {
      state.filters.page = parseInt(state.filters.page) + 1;
    },
    decrementPage: (state) => {
      if (state.filters.page > 1) {
        state.filters.page = parseInt(state.filters.page) - 1;
      }
    },
    loadMoreData: (state) => {
      state.articles.scrollLoading = true;
    },
    setSearchKeyWord: (state, keyword) => {
      state.filters.keyword = keyword;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticles.pending, (state, action) => {
      if (state.articles.loading === "idle" && !state.articles.scrollLoading) {
        state.articles.loading = "pending";
      }
    });
    builder.addCase(getArticles.fulfilled, (state, action) => {
      if (
        state.articles.loading === "pending" ||
        state.articles.scrollLoading
      ) {
        state.articles.data.push(...action.payload.data.articles);
        state.filters.page = action.payload.data.current_page;
        state.articles.loading = "idle";
        state.articles.scrollLoading = false;
      }
      console.log(action.payload.data.current_page, "current_page");
    });
    builder.addCase(getArticles.rejected, (state, action) => {
      if (
        state.articles.loading === "pending" ||
        state.articles.scrollLoading
      ) {
        state.articles.loading = "idle";
        state.articles.error = "Error occured";
        state.articles.scrollLoading = false;
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
    const filters = state.article.filters;
    const response = await axios.get("/articles", {
      params: {
        page: filters.page,
        keyword: filters.keyword,
        startDate: filters.startDate,
        endDate: filters.endDate,
        sources: filters.sources.map((n) => n.label),
        categories: filters.categories.map((n) => n.label),
        authors: filters.authors.map((n) => n.label),
      },
    });
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

export const {
  setFilterData,
  incrementPage,
  decrementPage,
  loadMoreData,
  clearFilter,
} = articleSlice.actions;
export default articleSlice.reducer;

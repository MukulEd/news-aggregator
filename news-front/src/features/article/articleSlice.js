import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: {
      loading: true,
      data: [],
    },
    categories: {
      loading: true,
      data: [],
    },
    sources: {
      loading: true,
      data: [],
    },
    authors: {
      loading: true,
      data: [],
    },
    filters: {
      sources: [],
      categories: [],
      authors: [],
      startDate: null,
      endDate: null,
    },
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = articleSlice.actions;

export default articleSlice.reducer;

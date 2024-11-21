import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoriesState {
  selectedCategory: string | null;
}

const initialState: CategoriesState = {
  selectedCategory: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;

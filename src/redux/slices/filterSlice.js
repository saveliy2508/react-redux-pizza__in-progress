import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sortBy: 'популярности'
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
    }
  }
})

export const {setCategory, setSortBy} = filterSlice.actions;

export default filterSlice.reducer;
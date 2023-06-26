import { createSlice } from '@reduxjs/toolkit';
import { results } from '../../data/data'

const gamesSlice = createSlice({
  name: 'counter',
  initialState: results,
  reducers: {
    get: (state) => state,
  },
});

export const { get } = gamesSlice.actions;
export default gamesSlice.reducer;
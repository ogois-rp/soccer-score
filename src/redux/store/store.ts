import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../games/games-slice'; // Import your root reducer

// Define your store configuration
const store = configureStore({
  reducer: gamesReducer,
  // Other store configuration options (e.g., middleware, devtools, etc.)
});

export default store;
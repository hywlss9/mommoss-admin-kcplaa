import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Auth {
  accessToken: string;
}

const initialState: Auth = { accessToken: '' };

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Auth>) => {
      state.accessToken = action.payload.accessToken;
    },
    resetAuth: state => {
      state = initialState;
    },
  },
});

export const { setToken, resetAuth } = auth.actions;
export default auth.reducer;

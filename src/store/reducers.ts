import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateUserData, fetchUserData, fetchIdbyEmail, setLoading, setError } from './actions';

interface UserState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
    loading: false,
    error: null,
    data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLoading, (state, action: PayloadAction<any>) => {
        state.loading = action.payload;
      })
      .addCase(setError, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
			.addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
			.addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
			.addCase(fetchIdbyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIdbyEmail.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchIdbyEmail.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const rootReducer = {
  user: userSlice.reducer,
};

export default rootReducer;

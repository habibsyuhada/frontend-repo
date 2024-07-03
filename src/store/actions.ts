import { createAsyncThunk,createAction } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:5001/tt-ebuddy/us-central1/api';

export const setLoading = createAction<boolean>('user/setLoading');
export const setError = createAction<string | null>('user/setError');

export const updateUserData = createAsyncThunk(`user/updateUserData`, async (data: any, thunkAPI) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/update-user-data`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json();
    } else {
			console.log(response)
      return thunkAPI.rejectWithValue(response.statusText ?? 'Failed to update user data');
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (id: string, thunkAPI) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/fetch-user-data/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      return thunkAPI.rejectWithValue('Failed to fetch user data');
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchIdbyEmail = createAsyncThunk('user/fetchIdbyEmail', async (email: string, thunkAPI) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/fetch-id-by-email/${email}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      return thunkAPI.rejectWithValue('Failed to fetch ID by email');
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});



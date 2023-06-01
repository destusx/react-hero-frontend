import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async params => {
    try {
        const { data } = await axios.post('/register', params);
        return data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        throw error;
    }
});

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async user => {
    const data = await fetch('http://localhost:4444/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const json = await data.json();
    return json;
});

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async () => {
        const { data } = await axios.get('/user');
        return data;
    }
);

const initialState = {
    data: null,
    registerData: null,
    authStatus: 'idle',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.data = null;
            state.status = 'idle';
            window.localStorage.clear();
            state.registerData = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchRegister.pending, state => {
                state.authStatus = 'loading';
                state.registerData = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.authStatus = 'idle';
                state.registerData = action.payload;
            })
            .addCase(fetchRegister.rejected, state => {
                state.authStatus = 'error';
                state.registerData = null;
            })
            .addCase(fetchLogin.pending, state => {
                state.authStatus = 'loading';
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.authStatus = 'idle';
                state.data = action.payload;
            })
            .addCase(fetchLogin.rejected, state => {
                state.authStatus = 'error';
            })
            .addCase(fetchCurrentUser.pending, state => {
                state.authStatus = 'loading';
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.authStatus = 'idle';
                state.data = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, state => {
                state.authStatus = 'error';
            });
    },
});

export const selectIsAuth = state => Boolean(state.auth.data?.token);
export const selectIsRegiser = state => Boolean(state.auth.registerData?.token);

export default authSlice.reducer;

export const { logout } = authSlice.actions;

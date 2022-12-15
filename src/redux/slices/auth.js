import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthService} from '../services';
import type {AppDispatch} from '../store';

export interface UserInterface {
    id: number;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    created_at: string;
    status: number;
    updated_at: string;
    address: string;
    profileImage: string;
}

export interface AuthState {
    user: UserInterface | null;
    token: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setDefaultState: (state) => {
            state.user = null;
        },
        logout: () => {
            // We do not need to make any changes in state as we remove session storage completely in store.ts
            return initialState;
        },
        loginSucceeded: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    },
});

const {
    logout,
    loginSucceeded,
} = authSlice.actions;


const login = (email: string, password: string, callback: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await AuthService.login(email,password);
    if (success) {
        dispatch(loginSucceeded({user: response.data}));
    }
    callback(success, response);
}

const logoutUser = (email: string, password: string, callback: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await AuthService.logout();
    dispatch(logout());
    callback(success, response);
}

const { reducer } = authSlice;
export {
    reducer as authReducer,
    login,
    logoutUser,
    logout
};

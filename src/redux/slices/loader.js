import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch} from '../store';

// Define the initial state using that type

interface LoaderStateInterface {
    loader: boolean;
}

const initialState: LoaderStateInterface = {
    loader: false,
};

export const loaderSlice = createSlice({
    name: 'loader',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        loading: (state, action: PayloadAction<any>) => {
            state.loader = action.payload;
        }
    },
});

const {
    loading,
} = loaderSlice.actions;


const startLoader = () => async (dispatch: AppDispatch) => {
    dispatch(loading(true));
}
const stopLoader = () => async (dispatch: AppDispatch) => {
    dispatch(loading(false));
}

const {reducer} = loaderSlice;
export {
    reducer as loaderReducer,
    startLoader,
    stopLoader
};

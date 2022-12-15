import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EmployeeService} from '../services';
import type {AppDispatch} from '../store';


export interface EmployeeInterface {
    id: number;
    full_name: string;
    role: string;
}

export interface EmployeeStateInterface {
    employees: EmployeeInterface[];
}

// Define the initial state using that type
const initialState: EmployeeStateInterface = {
    employees: []
};

export const employeeSlice = createSlice({
    name: 'employee',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setEmployeesData: (state,action: PayloadAction<any>) => {
            state.employees = action.payload
        },
    },
});

const {
    setEmployeesData,
} = employeeSlice.actions;


const getEmployeesData = (callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await EmployeeService.getEmployeesData();
    if (success) {
        dispatch(setEmployeesData(response.data));
    }
    callback && callback(success, response);
}

const { reducer } = employeeSlice;
export {
    reducer as employeeReducer,
    getEmployeesData,
};

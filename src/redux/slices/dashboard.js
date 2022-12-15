import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DashboardService} from '../services';
import type {AppDispatch} from '../store';
import type {UserInterface} from "./auth";
import {setTodayAttendance} from "./attendance";

export interface DashboardState {
    total_assigned_projects: number;
    total_dsr_received: number;
    total_dsr_send: number;
    today_quote: string;
    upcoming_birthdays: UserInterface[]
}

// Define the initial state using that type
const initialState: DashboardState = {
    total_assigned_projects: 0,
    total_dsr_received: 0,
    total_dsr_send: 0,
    today_quote: '',
    upcoming_birthdays: []
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        totalAssignedProjects: (state,action: PayloadAction<any>) => {
            state.total_assigned_projects = action.payload;
        },
        totalDsrSend: (state,action: PayloadAction<any>) => {
            state.total_dsr_send = action.payload;
        },
        totalDsrReceived: (state,action: PayloadAction<any>) => {
            state.total_dsr_received = action.payload;
        },
        setUpcomingBirthday: (state,action: PayloadAction<any>) => {
            state.upcoming_birthdays = action.payload;
        },
        setTodayQuote: (state,action: PayloadAction<any>) => {
            state.today_quote = action.payload;
        },
        setDashboardData: (state,action: PayloadAction<any>) => {
            state.total_assigned_projects = action.payload.total_assigned_projects;
            state.total_dsr_send = action.payload.total_dsr_send;
            state.total_dsr_received = action.payload.total_dsr_received;
            state.upcoming_birthdays = action.payload.upcoming_birthdays;
            state.today_quote = action.payload.today_quote;
        },
    },
});

const {
    totalAssignedProjects,
    totalDsrSend,
    totalDsrReceived,
    setUpcomingBirthday,
    setDashboardData,
} = dashboardSlice.actions;


const getDashboardData = (callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await DashboardService.getDashboardData();
    if (success) {
        const {data: {attendance} } = response;
        dispatch(setDashboardData(response.data));
        // if(attendance){
            dispatch(setTodayAttendance(attendance));
        // }
    }
    callback && callback(success, response);
}

const { reducer } = dashboardSlice;
export {
    reducer as dashboardReducer,
    getDashboardData,
};

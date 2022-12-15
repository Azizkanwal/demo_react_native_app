import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AttendanceService, AuthService} from '../services';
import type {AppDispatch} from '../store';

export interface AttendanceInterface {
    status: number;
    date: string;
    time_in: string | null;
    time_out: string | null;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface AttendancePayloadInterface {
    page?: number;
    items?: number;
}

export interface AttendanceStateInterface {
    attendance: AttendanceInterface | null;
    attendances: AttendanceDetailsInterface;
}

interface AttendanceDetailsInterface {
    rows: AttendanceInterface[],
    count: number,
    currentPage: number
}


const defaultAttendances: AttendanceDetailsInterface = {
    rows: [],
    count: 0,
    currentPage: 0
}

// Define the initial state using that type
const initialState: AttendanceStateInterface = {
    attendance: null,
    attendances: defaultAttendances
};

export const attendanceSlice = createSlice({
    name: 'attendance',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setTodayAttendance: (state, action: PayloadAction<any>) => {
            state.attendance = action.payload;
        },
        setAttendancesData: (state, action: PayloadAction<any>) => {
            state.attendances = action.payload;
        }
    },
});

const {
    setTodayAttendance,
    setAttendancesData
} = attendanceSlice.actions;

const timeIn = (callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await AttendanceService.timeIn();
    if (success) {
        dispatch(setTodayAttendance(response.data));
    }
    callback && callback(success, response);
}

const timeOut = (callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await AttendanceService.timeOut();
    if (success) {
        dispatch(setTodayAttendance(response.data));
    }
    callback && callback(success, response);
}

const getAttendancesData = (params: AttendancePayloadInterface, callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await AttendanceService.getAttendancesData(params);
    if (success) {
        dispatch(setAttendancesData({rows: response.data, count: response.meta.pagination.count, currentPage: params.page}));
    }
    callback && callback(success, response);
}

const { reducer } = attendanceSlice;

export {
    reducer as attendanceReducer,
    timeIn,
    timeOut,
    getAttendancesData,
    setTodayAttendance
};

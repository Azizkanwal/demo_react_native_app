import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StatusReportService} from '../services';
import type { AppDispatch } from '../store';

export interface StatusReportPayloadInterface {
    page?: number;
    items?: number;
}

export interface WeeklyStatusReportInterface {
    id: number;
    title: string;
    project_name: string;
    user_name: string;
    date: string;
    user_id: number;
}

export interface DailyStatusReportInterface {
    id: number;
    title: string;
    project_name: string;
    user_name: string;
    date: string;
    user_id: number;
}

export interface WeeklyStatusReportsInterface {
    rows: WeeklyStatusReportInterface[];
    count: number;
    currentPage: number;
}

export interface DailyStatusReportsInterface {
    rows: DailyStatusReportInterface[];
    count: number;
    currentPage: number;
}

interface StatusReportStateInterface {
    sendDailyStatusReports: DailyStatusReportsInterface;
    receivedDailyStatusReports: DailyStatusReportsInterface;
    sendWeeklyStatusReports: WeeklyStatusReportsInterface;
    receivedWeeklyStatusReports: WeeklyStatusReportsInterface;
}

const defaultState = {
    rows: [],
    count: 0,
    currentPage: 0
}

// Define the initial state using that type
const initialState: StatusReportStateInterface = {
    sendDailyStatusReports: defaultState,
    receivedDailyStatusReports: defaultState,
    sendWeeklyStatusReports: defaultState,
    receivedWeeklyStatusReports: defaultState,
};

export const statusReportSlice = createSlice({
    name: 'statusReport',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setSendDailyStatusReports: (state,action: PayloadAction<any>) => {
            state.sendDailyStatusReports = action.payload;
        },
        setReceivedDailyStatusReports: (state,action: PayloadAction<any>) => {
            state.receivedDailyStatusReports = action.payload;
        },
        setSendDailyStatusReportDetail: (state,action: PayloadAction<any>) => {
            state.sendDailyStatusReportDetail = action.payload;
        },
        setReceivedDailyStatusReportDetail: (state,action: PayloadAction<any>) => {
            state.receivedDailyStatusReportDetail = action.payload;
        },
        setSendWeeklyStatusReports: (state,action: PayloadAction<any>) => {
            state.sendWeeklyStatusReports = action.payload;
        },
        setReceivedWeeklyStatusReports: (state,action: PayloadAction<any>) => {
            state.receivedWeeklyStatusReports = action.payload;
        },
        setSendWeeklyStatusReportDetail: (state,action: PayloadAction<any>) => {
            state.sendWeeklyStatusReportDetail = action.payload;
        },
        setReceivedWeeklyStatusReportDetail: (state,action: PayloadAction<any>) => {
            state.receivedWeeklyStatusReportDetail = action.payload;
        },
    },
});

const {
    setSendDailyStatusReports,
    setReceivedDailyStatusReports,
    setSendDailyStatusReportDetail,
    setReceivedDailyStatusReportDetail,
    setSendWeeklyStatusReports,
    setReceivedWeeklyStatusReports,
    setSendWeeklyStatusReportDetail,
    setReceivedWeeklyStatusReportDetail,
} = statusReportSlice.actions;

const getSendDailyStatusReports = (params: StatusReportPayloadInterface, callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await StatusReportService.getSendDailyStatusReports(params);
    if (success) {
        dispatch(setSendDailyStatusReports({rows: response.data, count: response.meta.pagination.count, currentPage: params.page}));
    }
    callback && callback(success, response);
}

const getReceivedDailyStatusReports = (params: StatusReportPayloadInterface, callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await StatusReportService.getReceivedDailyStatusReports(params);
    if (success) {
        dispatch(setReceivedDailyStatusReports({rows: response.data, count: response.meta.pagination.count, currentPage: params.page}));
    }
    callback && callback(success, response);
}

const getSendDailyStatusDetail = (id: number, callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await StatusReportService.getSendDailyStatusReportDetail(id);
    if (success) {
        dispatch(setSendDailyStatusReportDetail(response.data));
    }
    callback && callback(success, response);
}

const getReceivedDailyStatusDetail = (id: number, callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await StatusReportService.getReceivedDailyStatusReportDetail(id);
    if (success) {
        dispatch(setReceivedDailyStatusReportDetail(response.data));
    }
    callback && callback(success, response);
}

const submitDailyStatusReport = (params: FormData, callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await StatusReportService.submitDailyStatus(params);
    callback && callback(success, response);
}

const getSendWeeklyStatusReports = (params: StatusReportPayloadInterface, callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await StatusReportService.getSendWeeklyStatusReports(params);
    if (success) {
        dispatch(setSendWeeklyStatusReports({rows: response.data, count: response.meta.pagination.count, currentPage: params.page}));
    }
    callback && callback(success, response);
}

const getReceivedWeeklyStatusReports = (params: StatusReportPayloadInterface, callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await StatusReportService.getReceivedWeeklyStatusReports(params);
    if (success) {
        dispatch(setReceivedWeeklyStatusReports({rows: response.data, count: response.meta.pagination.count, currentPage: params.page}));
    }
    callback && callback(success, response);
}

const getSendWeeklyStatusDetail = (id: number, callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await StatusReportService.getSendWeeklyStatusReportDetail(id);
    if (success) {
        dispatch(setSendWeeklyStatusReportDetail(response.data));
    }
    callback && callback(success, response);
}

const getReceivedWeeklyStatusDetail = (id: number, callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await StatusReportService.getReceivedWeeklyStatusReportDetail(id);
    if (success) {
        dispatch(setReceivedWeeklyStatusReportDetail(response.data));
    }
    callback && callback(success, response);
}

const submitWeeklyStatusReport = (params: FormData, callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await StatusReportService.submitWeeklyStatus(params);
    callback && callback(success, response);
}

const { reducer } = statusReportSlice;
export {
    reducer as statusReportReducer,
    getSendDailyStatusReports,
    getReceivedDailyStatusReports,
    getSendDailyStatusDetail,
    getReceivedDailyStatusDetail,
    submitDailyStatusReport,
    getSendWeeklyStatusReports,
    getReceivedWeeklyStatusReports,
    getSendWeeklyStatusDetail,
    getReceivedWeeklyStatusDetail,
    submitWeeklyStatusReport
};

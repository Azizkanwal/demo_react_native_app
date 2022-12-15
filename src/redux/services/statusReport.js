import {API} from '../../api';
import {ReturnError, ReturnSuccess} from "./index";
import type {StatusReportPayloadInterface} from "../slices";

export const getSendDailyStatusReports = (params: StatusReportPayloadInterface) => {
    return API.get(`/daily_status/send_list`, params)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

export const getReceivedDailyStatusReports = (params: StatusReportPayloadInterface) => {
    return API.get(`/daily_status/received_list`, params)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

export const getSendDailyStatusReportDetail = (id: number) => {
    return API.get(`/daily_status/${id}/fetch_send`)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

export const getReceivedDailyStatusReportDetail = (id: number) => {
    return API.get(`/daily_status/${id}/fetch_received`)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

export const submitDailyStatus = (params: FormData) => {
    return API.post(`/daily_status/add_dsr`,  params)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

export const getSendWeeklyStatusReports = (params: StatusReportPayloadInterface) => {
    return API.get(`/weekly_status/send_list`, params)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

export const getReceivedWeeklyStatusReports = (params: StatusReportPayloadInterface) => {
    return API.get(`/weekly_status/received_list`, params)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

export const getSendWeeklyStatusReportDetail = (id: number) => {
    return API.get(`/weekly_status/${id}/fetch_send`)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

export const getReceivedWeeklyStatusReportDetail = (id: number) => {
    return API.get(`/weekly_status/${id}/fetch_received`)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

export const submitWeeklyStatus = (params: FormData) => {
    return API.post(`/weekly_status/add_report`,  params)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}


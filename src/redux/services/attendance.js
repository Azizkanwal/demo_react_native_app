import {API} from '../../api';
import {ReturnError, ReturnSuccess} from "./index";
import type {AttendancePayloadInterface} from "../slices";

export const timeIn = () => {
    return API.post(`/attendances/time_in`)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

export const timeOut = () => {
    return API.post(`/attendances/time_out`)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}


export const getAttendancesData = (params: AttendancePayloadInterface) => {
    return API.get(`/attendances`, params)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}
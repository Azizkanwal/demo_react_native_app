import {API} from '../../api';
import { ReturnError, ReturnSuccess } from "./index";

export const getDashboardData = () => {
    return API.get(`/dashboard`)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}
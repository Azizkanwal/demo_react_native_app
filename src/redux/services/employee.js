import {API} from '../../api';
import { ReturnError, ReturnSuccess } from "./index";

export const getEmployeesData = () => {
    return API.get(`/employees/get_all_user`)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}
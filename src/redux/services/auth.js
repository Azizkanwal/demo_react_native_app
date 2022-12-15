import {API} from '../../api';
import { ReturnError, ReturnSuccess } from "./index";

export const login = (email: string, password: string) => {
    return API.post(`/sessions`, {email, password})
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

export const logout = () => {
    return API.delete(`/sessions`)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

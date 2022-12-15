import {API} from '../../api';
import {ReturnError, ReturnSuccess} from "./index";

export const getProjectsData = () => {
    return API.get(`/projects`)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}

export const getAssignedProjectsData = () => {
    return API.get(`/projects/assigned_projects`)
        .then((response) => response.data)
        .then(ReturnSuccess)
        .catch(ReturnError);
}
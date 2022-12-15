import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch} from "../store";
import {ProjectService} from "../services";

export interface ProjectInterface {
    name: string;
    start_date: string;
    status: string;
    manager_id: number | null;
    lead_id: number | null;
    client_id: number | null;
}

export interface ProjectStateInterface {
    assignedProjects: ProjectInterface[];
}

// Define the initial state using that type
const initialState: ProjectStateInterface = {
    assignedProjects: []
};

export const projectSlice = createSlice({
    name: 'project',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setAssignedProjectsData: (state, action: PayloadAction<any>) => {
            state.assignedProjects = action.payload;
        }
    },
});

const {
    setAssignedProjectsData,
} = projectSlice.actions;


const getAssignedProject = (callback?: VoidFunction) => async (dispatch: AppDispatch) => {
    const {success, ...response} = await ProjectService.getAssignedProjectsData();
    if (success) {
        dispatch(setAssignedProjectsData(response.data));
    }
    callback && callback(success, response);
}

const {reducer} = projectSlice;

export {
    reducer as projectReducer,
    setAssignedProjectsData,
    getAssignedProject
};

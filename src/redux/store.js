import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import type { AnyAction } from 'redux';
import {
    authReducer,
    attendanceReducer,
    dashboardReducer,
    statusReportReducer,
    projectReducer,
    employeeReducer,
    loaderReducer
} from './slices';
import { AsyncStorage } from 'react-native';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ["auth", "dashboard", "attendance", "statusReport", "project", "employee"]
};

const appReducer = combineReducers({
    auth: authReducer,
    attendance: attendanceReducer,
    dashboard: dashboardReducer,
    statusReport: statusReportReducer,
    project: projectReducer,
    employee: employeeReducer,
    loading: loaderReducer
})

const rootReducer = (state: any, action: AnyAction) => {
    if (action.type === 'auth/logout') {
        // for all keys defined in your persistConfig(s)
        AsyncStorage.removeItem('persist:root');
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import * as AuthService from './auth';
import * as AttendanceService from './attendance';
import * as DashboardService from './dashboard';
import * as EmployeeService from './employee';
import * as ProjectService from './project';
import * as StatusReportService from './statusReport';

const ReturnSuccess = (data: any) => (data);

const ReturnError = (error: any) => {
    return ({success: false, message: error.message, errors: error.errors ?? []});
};

export {
    ReturnSuccess,
    ReturnError,
    AuthService,
    AttendanceService,
    DashboardService,
    EmployeeService,
    ProjectService,
    StatusReportService
}





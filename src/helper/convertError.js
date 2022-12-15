const errors = {
    'email.required': 'Email is required.',
    'email.invalid': 'Email is invalid.',
    'password.required': 'Password is required.',
    'session.expired': `Your session has expired. Please login again.`,
    'permission.denied': `You don't have permission.`,
};

export const convertError = (value: string) => {
    if (errors.hasOwnProperty(value)) {
        // tslint:disable-next-line:no-any
        return (errors)[value];
    }
    return value;
};


export function validateEmail(email: string) {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
}

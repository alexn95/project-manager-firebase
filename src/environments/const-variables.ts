const timeToClose = 5000;

export const variables = {
    snackBar: {
        default:
            {
                action: 'close',
                config: { duration: timeToClose }
            },
        signup: {
            success:
                {
                    message: 'New user was created.',
                    action: 'close',
                    config: { duration: timeToClose }
                },
        },
        login: {
            success:
                {
                    message: 'You are authorized.',
                    action: 'close',
                    config: { duration: timeToClose }
                },
            incorrectData:
                {
                    message: 'Incorrect email ro password.',
                    action: 'close',
                    config: { duration: timeToClose }
                },
        },
        mustLogin:
            {
                message: 'To use our aplication you must login.',
                action: 'close',
                config: { duration: timeToClose }
            }
    }
};

export const routingUrl = {
    home: '',
    projects: 'projects',
    loginPage: 'login',
    signupPage: 'signup'
};

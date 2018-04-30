const timeToClose = 5000;

export const snackBarMsgs = {
    error:
        {
            action: 'close',
            config: { duration: timeToClose }
        },
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
                message: 'Incorrect email or password.',
                action: 'close',
                config: { duration: timeToClose }
            },
    },
    mustLogin: {
            message: 'To use our aplication you must login.',
            action: 'close',
            config: { duration: timeToClose }
    },
    updateProjectSuccess: {
        message: 'Project was updated.',
        action: 'close',
        config: { duration: timeToClose }
    },
    deleteProjectSuccess: {
        message: 'Project was deleted.',
        action: 'close',
        config: { duration: timeToClose }
    }
};



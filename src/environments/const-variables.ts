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
        }
    }
};



const timeToClose = 5000;
const actionClose = 'close';

export const snackBarMsgs = {
    error:
        {
            action: actionClose,
            config: { duration: timeToClose }
        },
    default:
        {
            action: actionClose,
            config: { duration: timeToClose }
        },
    signup: {
        success:
            {
                message: 'New user was created.',
                action: actionClose,
                config: { duration: timeToClose }
            },
    },
    login: {
        success:
            {
                message: 'You are authorized.',
                action: actionClose,
                config: { duration: timeToClose }
            },
        incorrectData:
            {
                message: 'Incorrect email or password.',
                action: actionClose,
                config: { duration: timeToClose }
            },
    },
    mustLogin: {
            message: 'To use our aplication you must login.',
            action: actionClose,
            config: { duration: timeToClose }
    },
    updateProjectSuccess: {
        message: 'Project was updated.',
        action: actionClose,
        config: { duration: timeToClose }
    },
    deleteProjectSuccess: {
        message: 'Project was deleted.',
        action: actionClose,
        config: { duration: timeToClose }
    },
    leaveProjectSuccess: {
        message: 'Project was left.',
        action: actionClose,
        config: { duration: timeToClose }
    },
    removeUserSuccess: {
        message: 'User was removed.',
        action: actionClose,
        config: { duration: timeToClose }
    },
    deleteIssueSuccess: {
        message: 'Issue was deleted.',
        action: actionClose,
        config: { duration: timeToClose }
    },
    userInviteSuccess: {
        message: 'User was invited.',
        action: actionClose,
        config: { duration: timeToClose }
    },
    projectNotFound: {
        message: 'Project with this id not exist or you have no access to open it.',
        action: actionClose,
        config: { duration: timeToClose }
    },
    issueCreate: {
        message: 'New issue was created.',
        action: actionClose,
        config: { duration: timeToClose }
    },
    projectCreate: {
        message: 'New project was created.',
        action: actionClose,
        config: { duration: timeToClose }
    }
};



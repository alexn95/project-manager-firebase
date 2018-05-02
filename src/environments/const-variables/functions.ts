const rootURL = 'https://us-central1-task-manager-free.cloudfunctions.net';

export const functions = {
    searchProjects: rootURL + '/searchProjects',
    getUserByEmail: rootURL + '/getUserByEmail',
};

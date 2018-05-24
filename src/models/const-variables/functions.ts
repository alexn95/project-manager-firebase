import { environment } from './../../environments/environment';

export const functions = {
    searchProjects: environment.rootFunctionsURL + '/searchProjects',
    getUserByEmail: environment.rootFunctionsURL + '/getUserByEmail',
};

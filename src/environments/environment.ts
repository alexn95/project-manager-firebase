// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    rootFunctionsURL: 'https://us-central1-task-manager-free.cloudfunctions.net',
    production: false,
    firebase: {
        apiKey: 'AIzaSyCo2L0I3GWadM1GxWPUBQYjl_9iybBPgRE',
        authDomain: 'task-manager-free.firebaseapp.com',
        databaseURL: 'https://task-manager-free.firebaseio.com',
        projectId: 'task-manager-free',
        storageBucket: 'task-manager-free.appspot.com',
        messagingSenderId: '850994270189'
    }
};

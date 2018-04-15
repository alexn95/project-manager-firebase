// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
     production: false,
     firebase: {
          apiKey: 'AIzaSyAuCohujFcI1qWi1uT6ewSPdeA3yco4im8',
          authDomain: 'project-manager-firebase.firebaseapp.com',
          databaseURL: 'https://project-manager-firebase.firebaseio.com',
          projectId: 'project-manager-firebase',
          storageBucket: 'project-manager-firebase.appspot.com',
          messagingSenderId: '856404455538'
     },
     routing: {
        loginPage: 'login',
        toolbar: ''
     }
};

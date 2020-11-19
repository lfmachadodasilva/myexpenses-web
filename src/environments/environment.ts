// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export interface IEnvironment {
  production: boolean;
  apiUrl: string;
  firebase: any;
}

export const environment: IEnvironment = {
  production: false,
  apiUrl: 'https://myexpenses-backend-dev.herokuapp.com/',
  firebase: {
    apiKey: 'AIzaSyDMDE7eTQbjwkQglMJf5KnFtMr48-pAoVM',
    authDomain: 'lfmachadodasilva-dev.firebaseapp.com',
    databaseURL: 'https://lfmachadodasilva-dev.firebaseio.com',
    projectId: 'lfmachadodasilva-dev',
    storageBucket: 'lfmachadodasilva-dev',
    messagingSenderId: 'my-sender-id',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

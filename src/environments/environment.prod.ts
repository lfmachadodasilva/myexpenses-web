export interface IEnvironment {
  production: boolean;
  apiUrl: string;
  firebase: any;
}

export const environment: IEnvironment = {
  production: true,
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

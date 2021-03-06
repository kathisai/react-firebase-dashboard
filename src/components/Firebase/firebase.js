   import app from 'firebase/app'
   import 'firebase/auth'
   import 'firebase/database';

   const config = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      };

//       const config =
//   process.env.NODE_ENV === 'production' ? prodConfig : devConfig;  // This is how we can have production and test environments
      class firebase {
          constructor() {
              app.initializeApp(config);
              this.auth = app.auth();
              this.db = app.database();
          }

          // ** Auth API
          doCreateUserWithEmailAndPassowrd = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
          doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
          doSignOut = () => { this.auth.signOut(); console.log("Signed Out !!!")}
          doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
          doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

          //**** User API real time database
          user = uid => this.db.ref(`users/${uid}`);

          users = () => this.db.ref('users/');

          progress = () => this.db.ref('progress/')
      }

      export default firebase;
import {initializeApp} from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword,
  signOut,updateProfile,AuthErrorCodes } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJG3Yl7EApWV5O5NWYvWCOUR67CuV8fqM",
  authDomain: "my-books-52bd8.firebaseapp.com",
  databaseURL: "https://my-books-52bd8-default-rtdb.firebaseio.com",
  projectId: "my-books-52bd8",
  storageBucket: "my-books-52bd8.appspot.com",
  messagingSenderId: "1084308524802",
  appId: "1:1084308524802:web:044d603abf4b546ee83c1b",
  measurementId: "G-H7NVSD1MR0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


export class User {

  static updateUserDisplayName(displayName){

    const tempAuth = getAuth(app);
   return  updateProfile(tempAuth.currentUser,{
      displayName:displayName
    })
  }


   static signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth,provider)
  }

    static signInWithEmailAndPassword(email,password){
         return signInWithEmailAndPassword(auth,email,password);
    }

    static signupUserWithEmailAndPassword(email,password){
      return createUserWithEmailAndPassword(auth,email,password)
    }

    static signOutUser(){
      return signOut(auth)
    }

    static getCurrentUserID(){
      return auth.currentUser.uid;
    }

}




export const authErrorCodeToUser = code => {
    if(code === AuthErrorCodes.INVALID_PASSWORD || code === 'auth/user-not-found'){
      return " User Email or Password is incorrect"
    }else if(code === AuthErrorCodes.EMAIL_EXISTS){
      return "So sorry.Email already in use"
    }
}
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from './fire'

const provider = new GoogleAuthProvider();

const logInGoogle = () =>{
    return signInWithPopup(auth, provider)
    .then((result) => {
      return result.user;
    })
    .catch((error) => {
       console.log(error.message);
       return null;
    });
}

export default logInGoogle;
import {app} from '../../firebase/firebaseconfig'
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

export const auth = getAuth(app);

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

export const signOut = () => {
    return auth.signOut();
}
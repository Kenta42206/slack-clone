import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore'
import {app} from '../../firebase/firebaseconfig'
import {User, UserRef} from '../../types/User'
import { profile } from 'console';

const db = getFirestore(app);

export const getUser = async(user_uid:string)=>{
    const userRef = doc(db, "users", user_uid);
    const docSnap = await getDoc(userRef);
    if(docSnap.exists()){
        return docSnap.data() as User;
    }
}
export const postUser = async(userRef:UserRef)=>{
    const user = userRef.user;
    await setDoc(doc(db,"users",userRef.user_uid),{
        displayName: user.displayName,
        email: user.email,
        profile_picture: user.profile_picture
    });
}

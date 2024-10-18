export interface User {
    profile_picture: string;
    email: string;
    displayName: string;
}

export interface UserRef {
    user_uid: string;
    user: User;
}
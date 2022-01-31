// user data schema which is stored in the database
export interface UserDataModal {
    uid: number;
    email: string;
    firstname: string;
    lastname: string;
    mobile: string;
    created_on: string;
    last_edited_on: string;
    last_login_on: string;
}

// what kind of response we are getting from the backend
// actual schema
export interface ResponseType {
    code: string;
    data: any;
}

// specificaly user list schema returned by api endpoint
// to get the user data
export interface UserResponse extends ResponseType {
    data: Array<UserDataModal>;
}

export const BareUserData: UserDataModal = {
    uid: 0,
    email: "",
    firstname: "",
    lastname: "",
    mobile: "",
    created_on: "",
    last_edited_on: "",
    last_login_on: "",
};

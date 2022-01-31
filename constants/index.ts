export default "constant's exports";

export const ACCESS_DENIED = "ACCESS_DENIED"; // access is denied for most of the clients without API key and ip

export const SUCCESS = "SUCCESS"; // if any api request is completed without any errors
export const FAILURE = "FAILURE"; // if any api request fails in between
export const PARTIAL_SUCCESS = "PARTIAL_SUCCESS"; // if any api request is partially completed
export const ERROR = "ERROR"; // if any error occurred during making any query in the backend
export const MISSING_DATA = "MISSING_DATA"; // any missing data in db

export const DATA_NOT_FOUND = "DATA_NOT_FOUND"; // if any kind of data is not present in the database
export const USER_NOT_FOUND = "USER_NOT_FOUND"; // if the user data is not found in the databse this response will be provided from the backend
export const USER_ALREADY_EXIST = "USER_ALREADY_EXIST"; // while creating new account if the user account already exists then this response will be provided from the backend
export const INVALID_PASSWORD = "INVALID_PASSWORD"; // for invalid password
export const PROVIDED_INCOMPLETE_DATA = "PROVIDED_INCOMPLETE_DATA"; // if incomplete data is provided during api request
export const EMAIL_LENGTH_EXCEED = "EMAIL_LENGTH_EXCEED"; // email length is not valid
export const EMAIL_PATTERN_NOT_MATCHED = "EMAIL_PATTERN_NOT_MATCHED"; // email is not valid according to the below regex
export const TEMPORARY_EMAIL_IS_NOT_ALLOWED = "TEMPORARY_EMAIL_IS_NOT_ALLOWED"; // if the email provided is temporary or disposable
export const SHORT_PASSWORD = "SHORT_PASSWORD"; // if the password provided is very slow
export const PASSWORD_LENGTH_EXCEED = "PASSWORD_LENGTH_EXCEED"; // if the password length exceed our limit

export const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // to validate emails string
export const IP_ADDRESS_REGEX =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; // to validate ip address in string form
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/; // password pattern regex to validate password strings

// fontend constants
export const HEADER_HEIGHT = 55;

// the default header every api request must contain while requesting
export const DefaultHeader = {
    key: "1fb59076000a488ad3c42b660a6c13f67846938e09ff05311cce75c47c89e2d5",
    ip: "192.178.55.189",
};

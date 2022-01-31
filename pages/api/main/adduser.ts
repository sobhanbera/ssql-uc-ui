import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql";

import {
    MAX_EMAIL_LENGTH,
    MAX_PASSWORD_LENGTH,
    MAX_SQL_CONCURRENT_CONNECTION,
    MIN_PASSWORD_LENGTH,
} from "../../../constants/limits";
import {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_USER,
} from "../../../constants/env";
import {
    EMAIL_LENGTH_EXCEED,
    EMAIL_PATTERN_NOT_MATCHED,
    EMAIL_REGEX,
    FAILURE,
    INVALID_PASSWORD,
    PARTIAL_SUCCESS,
    PASSWORD_LENGTH_EXCEED,
    PASSWORD_REGEX,
    SHORT_PASSWORD,
    SUCCESS,
    TEMPORARY_EMAIL_IS_NOT_ALLOWED,
    USER_ALREADY_EXIST,
} from "../../../constants";
import {
    canContinueAPIRequests,
    canContinueAPIRequestsForHeaderElements,
    emailIsAllowedAndNotATemporaryMail,
    getFormattedCurrentTime,
    isValidArray,
} from "../../../utils";

const database = mysql.createPool({
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    connectionLimit: MAX_SQL_CONCURRENT_CONNECTION,
});

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    if (canContinueAPIRequests(request, response)) {
        // user id or user email provided by the client side
        // at least one field among uid and email is required to generate OTP.
        // getting from header data
        const email = String(request.headers.email || "").trim();
        const password = String(request.headers.password || "").trim();
        const firstname = String(request.headers.firstname || "").trim();
        const lastname = String(request.headers.lastname || "").trim();
        const mobile = String(request.headers.mobile || "").trim();

        const currentTime = getFormattedCurrentTime();

        // console.log(email, password, firstname, lastname, mobile);

        // checking wheather the requried data is given through the header
        // while making the request to the backend
        if (
            canContinueAPIRequestsForHeaderElements(
                response,
                email,
                password,
                firstname,
                lastname,
                mobile
            )
        ) {
            if (email.length > MAX_EMAIL_LENGTH) {
                // if the email length is exceeding the maximum email length limit
                response.status(200).json({
                    code: EMAIL_LENGTH_EXCEED,
                });
            } else if (!EMAIL_REGEX.test(email)) {
                // if the email is not valid
                response.status(200).json({
                    code: EMAIL_PATTERN_NOT_MATCHED,
                });
            } else if (password.length < MIN_PASSWORD_LENGTH) {
                // if the password length is shorter then the limit we set
                response.status(200).json({
                    code: SHORT_PASSWORD,
                });
            } else if (password.length > MAX_PASSWORD_LENGTH) {
                // if the password is too long
                response.status(200).json({
                    code: PASSWORD_LENGTH_EXCEED,
                });
            } else if (!PASSWORD_REGEX.test(password)) {
                // if the password is invalid
                // that means the password doesn't contains any lower, upper characters and numbers
                response.status(200).json({
                    code: INVALID_PASSWORD,
                    message:
                        "Password's length must be between 8 to 30 characters. And contain at least one upper-case, one lower-case and 1 number.",
                });
            } else if (!emailIsAllowedAndNotATemporaryMail(email)) {
                // here we are checking that the email is spam or not
                // basically just checking if the email is disposable or not
                response.status(200).json({
                    code: TEMPORARY_EMAIL_IS_NOT_ALLOWED,
                });
            } else {
                // finally after all the above checks we will create the user account
                // and add it to the database
                // but first we should know if the user account already exists or not
                // if exists when response back with a error prompt
                // else register the user account
                database.query(
                    "SELECT uid FROM users WHERE email=?",
                    [email],
                    (err: any, res: any) => {
                        if (err) {
                            response.status(200).json({
                                code: FAILURE,
                            });
                        } else if (isValidArray(res)) {
                            // if the user exists response USER_ALREADY_EXIST code
                            response.status(200).json({
                                code: USER_ALREADY_EXIST,
                            });
                        } else {
                            // adding the user data to the db
                            database.query(
                                "INSERT INTO users (email, password, firstname, lastname, mobile, created_on, last_login_on) VALUES (?, ?, ?, ?, ?, ?, ?)",
                                [
                                    email,
                                    password,
                                    firstname,
                                    lastname,
                                    mobile,
                                    currentTime,
                                    currentTime,
                                ],
                                (err: any, res: any) => {
                                    // if any error occurred during adding the data
                                    if (err) {
                                        response.status(200).json({
                                            code: FAILURE,
                                        });
                                    } else {
                                        database.query(
                                            "SELECT uid, email, firstname, lastname, mobile, created_on, last_edited_on FROM users WHERE email=?",
                                            [email],
                                            (err: any, userData: any) => {
                                                // if the account is created but the user data could not be retrived in that case we will return partial success
                                                // response code
                                                if (err) {
                                                    response.status(200).json({
                                                        code: PARTIAL_SUCCESS,
                                                    });
                                                } else {
                                                    // finally we have created the user
                                                    // and we are reponding with a SUCCESS message
                                                    response.status(200).json({
                                                        code: SUCCESS,
                                                        data: userData,
                                                    });
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    }
}

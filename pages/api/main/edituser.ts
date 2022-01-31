import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql";

import { MAX_SQL_CONCURRENT_CONNECTION } from "../../../constants/limits";
import {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_USER,
} from "../../../constants/env";
import { FAILURE, SUCCESS } from "../../../constants";
import {
    canContinueAPIRequests,
    canContinueAPIRequestsForHeaderElements,
    getFormattedCurrentTime,
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
        const uid = String(request.headers.uid || "");
        const firstname = String(request.headers.firstname || "");
        const lastname = String(request.headers.lastname || "");
        const mobile = String(request.headers.mobile || "");

        const currentTime = getFormattedCurrentTime();

        // checking wheather the uid, firstname, lastname and mobile field is present
        // if present then edit the user in the db else respond with error
        if (
            canContinueAPIRequestsForHeaderElements(
                response,
                uid,
                firstname,
                lastname,
                mobile
            )
        ) {
            database.query(
                "UPDATE users SET firstname=?, lastname=?, mobile=?, last_edited_on=? WHERE uid=?",
                [firstname, lastname, mobile, currentTime, uid],
                (err: any, res: any) => {
                    if (err) {
                        response.status(200).json({
                            code: FAILURE,
                            err,
                        });
                    } else {
                        response.status(200).json({
                            code: SUCCESS,
                        });
                    }
                }
            );
        }
    }
}

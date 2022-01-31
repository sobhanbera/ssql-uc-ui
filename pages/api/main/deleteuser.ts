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

        // checking if the uid is provided
        // then deleting the user account in the database
        if (canContinueAPIRequestsForHeaderElements(response, uid)) {
            database.query(
                "DELETE FROM users WHERE uid=?",
                [uid],
                (err: any, res: any) => {
                    if (err) {
                        response.status(200).json({
                            code: FAILURE,
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

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
import { canContinueAPIRequests } from "../../../utils";

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
        const search = String(request.headers.search || "")
            .trim()
            .replace(" ", "%");

        // if the frontend or the user send any search query then we will start searching for the particular user
        // else we will return all the users available in the database..
        if (search)
            database.query(
                `SELECT uid, email, firstname, lastname, mobile, created_on, last_edited_on FROM users WHERE (email LIKE '%${search}%' OR firstname LIKE '%${search}%' OR lastname LIKE '%${search}%')`,
                [search, search, search],
                (err: any, res: any) => {
                    if (err) {
                        response.status(200).json({
                            code: FAILURE,
                            err,
                        });
                    } else {
                        response.status(200).json({
                            code: SUCCESS,
                            data: res,
                        });
                    }
                }
            );
        else
            database.query(
                "SELECT uid, email, firstname, lastname, mobile, created_on, last_edited_on FROM users",
                [search, search, search],
                (err: any, res: any) => {
                    if (err) {
                        response.status(200).json({
                            code: FAILURE,
                            err,
                        });
                    } else {
                        response.status(200).json({
                            code: SUCCESS,
                            data: res,
                        });
                    }
                }
            );
    }
}

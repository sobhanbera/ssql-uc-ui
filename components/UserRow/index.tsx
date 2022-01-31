import { useState } from "react";

import { MdDelete, MdEdit } from "react-icons/md";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";

import { DefaultHeader, SUCCESS } from "../../constants";
import { UserDataModal } from "../../modals";

interface UserRowProps {
    user: UserDataModal;
    index: number;
    toggleEdit: () => void;
}
export default function UserRow({ user, index, toggleEdit }: UserRowProps) {
    // inline function to format timestamp string
    const formatTime = (time: Dayjs) =>
        `${time.get("year")}-${time.get("month")}-${time.get("date")}  ${time.get(
            "hours"
        )}:${time.get("minutes")} `;

    const created_on = formatTime(dayjs(user.created_on));
    const last_edited_on = formatTime(dayjs(user.last_edited_on));

    // since we will not make request again after deleting any user
    // just don't render it if the user data is deleted
    // why to make an extra request to the backend just only to get the
    /// latest user data which will eventually not contain the deleted user
    const [deleted, setDeleted] = useState(false);

    const deleteUserData = () => {
        if (
            window.confirm(
                "Are you sure you want to delete the user? This proccess is irreversible and cannot be changed once done!"
            )
        ) {
            fetch("/api/main/deleteuser", {
                method: "POST",
                headers: {
                    ...DefaultHeader,
                    uid: String(user.uid),
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    if (res.code === SUCCESS) {
                        toast("User data deleted from the database.", {
                            type: "success",
                        });
                        setDeleted(true);
                    } else {
                        toast(
                            "Cannot delete the user currently! Sorry for the inconvenience.",
                            {
                                type: "info",
                            }
                        );
                    }
                })
                .catch((err) => {
                    toast(
                        "Cannot delete the user currently! Sorry for the inconvenience.",
                        {
                            type: "info",
                        }
                    );
                });
        }
    };

    // if the user is deleted then no need to render the user data
    if (deleted) return null;

    return (
        <tr>
            {/* 1. first is the serial number */}
            <td>{index + 1}</td>
            {/* 2. email of the user */}
            <td>{user.email}</td>
            {/* 3. full name of the user */}
            <td>{`${user.firstname} ${user.lastname}`}</td>
            {/* 4. mobile/phone number */}
            <td>{user.mobile}</td>
            {/* 5. time when the user account was created */}
            <td>{created_on}</td>
            {/* 6. time when the user account was edited last time */}
            <td>{last_edited_on}</td>
            {/* 7. operations - edit */}
            <td>
                <MdEdit onClick={toggleEdit} />
            </td>
            {/* 8. operations - delete */}
            <td>
                <MdDelete onClick={deleteUserData} />
            </td>
        </tr>
    );
}

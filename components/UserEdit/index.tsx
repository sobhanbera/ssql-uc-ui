import { useEffect, useState } from "react";

import { VscClose } from "react-icons/vsc";
import { toast } from "react-toastify";

import styles from "../../styles/pages/main/index.module.scss";
import { UserDataModal } from "../../modals";
import { DefaultHeader, SUCCESS } from "../../constants";

interface UserEditProps {
    user: UserDataModal;
    cancelEdit: () => void;
    setUser(user: UserDataModal): void;
}
export default function UserEdit(props: UserEditProps) {
    const { user, cancelEdit, setUser } = props;

    // states starts from here...
    // updated first name state
    const [updatedFirstname, setUpdatedFirstname] = useState<string>(
        user.firstname || ""
    );
    // updated last name
    const [updatedLastname, setUpdatedLastname] = useState<string>(user.lastname || "");
    // updated mobile number of the user
    const [updatedMobile, setUpdatedMobile] = useState<string>(user.mobile || "");

    // whenever the user changes or the props values updates
    // we will update the state likewise
    useEffect(() => {
        setUpdatedFirstname(user.firstname);
        setUpdatedLastname(user.lastname);
        setUpdatedMobile(user.mobile);
    }, [user]);

    // console.log(updatedMobile, updatedMobile.length);
    const updateUserData = (e: any) => {
        e.preventDefault();

        if (updatedFirstname.length < 3) {
            toast("Please enter a valid first name.", { type: "warning" });
        } else if (updatedLastname.length < 3) {
            toast("Please enter a valid last name.", { type: "warning" });
        } else if (updatedMobile.length !== 10 || isNaN(Number(updatedMobile))) {
            toast("Please enter a valid 10 digit phone number of the user.", {
                type: "warning",
            });
        } else {
            fetch("/api/main/edituser", {
                method: "POST",
                headers: {
                    ...DefaultHeader,
                    uid: String(user.uid),
                    firstname: updatedFirstname,
                    lastname: updatedLastname,
                    mobile: updatedMobile,
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.code === SUCCESS) {
                        // after updating the user we are hidding the edit UI
                        cancelEdit();
                        // also we are setting the main use data to the main table UI
                        setUser({
                            ...user,
                            firstname: updatedFirstname,
                            lastname: updatedLastname,
                            mobile: updatedMobile,
                        });
                        toast("Update user data successfully.", {
                            type: "success",
                        });
                    } else {
                        toast("Cannot update the user data.", {
                            type: "error",
                        });
                    }
                })
                .catch((err) => {
                    toast("Cannot update the user data.", {
                        type: "error",
                    });
                });
        }
    };

    return (
        <div
            className={`${styles.userEditContainer} ${
                user.email.length > 0 ? styles.active : styles.inactive
            }`}
            onClick={cancelEdit}
        >
            <div className={styles.mainCard} onClick={(e) => e.stopPropagation()}>
                <div className={styles.cardHeader} onClick={(e) => e.stopPropagation()}>
                    <p>Update User Data</p>
                    <VscClose onClick={cancelEdit} />
                </div>

                <form
                    onSubmit={(e) => updateUserData(e)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <label htmlFor="firstname" onClick={(e) => e.stopPropagation()}>
                        <p>First Name:</p>
                    </label>
                    <input
                        onClick={(e) => e.stopPropagation()}
                        id="firstname"
                        value={updatedFirstname}
                        placeholder="Edit firstname of the user"
                        onChange={(e) => setUpdatedFirstname(e.currentTarget.value)}
                    />

                    {/* tag input field */}
                    <label htmlFor="lastname" onClick={(e) => e.stopPropagation()}>
                        <p>Last Name:</p>
                    </label>
                    <input
                        onClick={(e) => e.stopPropagation()}
                        value={updatedLastname}
                        id="lastname"
                        onChange={(e) => setUpdatedLastname(e.currentTarget.value)}
                        placeholder="Edit lastname of the user"
                    />

                    {/* link input */}
                    <label htmlFor="mobile" onClick={(e) => e.stopPropagation()}>
                        <p>Phone Number:</p>
                    </label>
                    <input
                        onClick={(e) => e.stopPropagation()}
                        value={updatedMobile}
                        id="mobile"
                        onChange={(e) => setUpdatedMobile(e.currentTarget.value)}
                        placeholder="Edit mobile number of the user"
                    />

                    <button onClick={(e) => updateUserData(e)}>
                        Update User Account
                    </button>
                </form>
            </div>
        </div>
    );
}

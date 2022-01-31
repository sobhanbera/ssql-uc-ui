import { useEffect, useState } from "react";

import { VscClose } from "react-icons/vsc";
import { toast } from "react-toastify";

import styles from "../../styles/pages/main/index.module.scss";
import { UserDataModal } from "../../modals";
import {
    DefaultHeader,
    EMAIL_REGEX,
    PARTIAL_SUCCESS,
    PASSWORD_REGEX,
    SUCCESS,
    USER_ALREADY_EXIST,
} from "../../constants";
import {
    MAX_EMAIL_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
} from "../../constants/limits";

interface UserEditProps {
    showAddNewUserPanel: boolean;
    cancelAddingNewUser: () => void;
    addNewUser(user: UserDataModal): void;
}
export default function UserAdd(props: UserEditProps) {
    const { showAddNewUserPanel, cancelAddingNewUser, addNewUser } = props;

    // states starts from here...
    // email of the new user to create
    const [email, setEmail] = useState<string>("");
    // the password of the user to add to the database
    const [password, setPassword] = useState<string>("");
    // firsname, lastname and mobile number
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");

    // whenever the user changes or the props values updates
    // we will update the state likewise
    useEffect(() => {
        setEmail("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setMobile("");
    }, []);

    // console.log(updatedMobile, updatedMobile.length);
    const addNewUserAccount = (e: any) => {
        e.preventDefault();

        if (email.length > MAX_EMAIL_LENGTH) {
            // if the email length is exceeding the maximum email length limit
            toast("Please enter a valid email id of length less than 320.", {
                type: "warning",
            });
        } else if (!EMAIL_REGEX.test(email)) {
            // if the email is not valid
            toast("Please enter a valid email id.", { type: "warning" });
        } else if (password.length < MIN_PASSWORD_LENGTH) {
            // if the password length is shorter then the limit we set
            toast("Please enter a valid password id of minimum length 8.", {
                type: "warning",
            });
        } else if (password.length > MAX_PASSWORD_LENGTH) {
            // if the password is too long
            toast("Please enter a valid password of length less than 30.", {
                type: "warning",
            });
        } else if (!PASSWORD_REGEX.test(password)) {
            // if the password is invalid
            // that means the password doesn't contains any lower, upper characters and numbers
            toast(
                "Password's length must be between 8 to 30 characters. And contain at least one upper-case, one lower-case and 1 number.",
                { type: "warning" }
            );
        } else if (firstname.length < 3) {
            toast("Please enter a valid first name.", { type: "warning" });
        } else if (firstname.length < 3) {
            toast("Please enter a valid first name.", { type: "warning" });
        } else if (firstname.length < 3) {
            toast("Please enter a valid first name.", { type: "warning" });
        } else if (lastname.length < 3) {
            toast("Please enter a valid last name.", { type: "warning" });
        } else if (mobile.length !== 10 || isNaN(Number(mobile))) {
            toast("Please enter a valid 10 digit phone number of the user.", {
                type: "warning",
            });
        } else {
            fetch("/api/main/adduser", {
                method: "POST",
                headers: {
                    ...DefaultHeader,
                    email,
                    password,
                    firstname,
                    lastname,
                    mobile,
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res, res.code);
                    if (res.code === PARTIAL_SUCCESS) {
                        // after updating the user we are hidding the edit UI
                        cancelAddingNewUser();

                        toast("User account create successfully.", {
                            type: "info",
                        });
                    } else if (res.code === SUCCESS) {
                        const { data }: { data: UserDataModal[] } = res;
                        // after updating the user we are hidding the edit UI
                        cancelAddingNewUser();
                        // also we are setting the main use data to the main table UI
                        addNewUser({
                            ...data[0],
                        });

                        toast("New user account created successfully.", {
                            type: "success",
                        });
                    } else if (res.code === USER_ALREADY_EXIST) {
                        toast("User with same email already exists!", {
                            type: "info",
                        });
                    } else {
                        toast("1 Cannot add the user data.", {
                            type: "error",
                        });
                    }
                })
                .catch((err) => {
                    toast("Cannot add the user data.", {
                        type: "error",
                    });
                });
        }
    };

    return (
        <div
            className={`${styles.userAddContainer} ${
                showAddNewUserPanel ? styles.active : styles.inactive
            }`}
            onClick={cancelAddingNewUser}
        >
            <div className={styles.mainCard} onClick={(e) => e.stopPropagation()}>
                <div className={styles.cardHeader} onClick={(e) => e.stopPropagation()}>
                    <p>Create New Account</p>
                    <VscClose onClick={cancelAddingNewUser} />
                </div>

                <form
                    onSubmit={(e) => addNewUserAccount(e)}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* input for email id of the new user to add */}
                    <label htmlFor="email" onClick={(e) => e.stopPropagation()}>
                        <p>Email ID:</p>
                    </label>
                    <input
                        onClick={(e) => e.stopPropagation()}
                        id="email"
                        type="email"
                        value={email}
                        placeholder="Enter email id of the user"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    <label htmlFor="password" onClick={(e) => e.stopPropagation()}>
                        <p>Password:</p>
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        placeholder="Enter password for the account"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />

                    <label htmlFor="firstname" onClick={(e) => e.stopPropagation()}>
                        <p>First Name:</p>
                    </label>
                    <input
                        onClick={(e) => e.stopPropagation()}
                        id="firstname"
                        value={firstname}
                        placeholder="Enter firstname of the user"
                        onChange={(e) => setFirstname(e.currentTarget.value)}
                    />

                    {/* tag input field */}
                    <label htmlFor="lastname" onClick={(e) => e.stopPropagation()}>
                        <p>Last Name:</p>
                    </label>
                    <input
                        onClick={(e) => e.stopPropagation()}
                        value={lastname}
                        id="lastname"
                        onChange={(e) => setLastname(e.currentTarget.value)}
                        placeholder="Enter lastname of the user"
                    />

                    {/* link input */}
                    <label htmlFor="mobile" onClick={(e) => e.stopPropagation()}>
                        <p>Phone Number:</p>
                    </label>
                    <input
                        onClick={(e) => e.stopPropagation()}
                        value={mobile}
                        id="mobile"
                        onChange={(e) => setMobile(e.currentTarget.value)}
                        placeholder="Enter mobile number of the user"
                    />

                    <button onClick={(e) => addNewUserAccount(e)}>Add new user</button>
                </form>
            </div>
        </div>
    );
}

import Head from "next/head";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SearchBar, UserAdd, UserEdit, UserRow } from "../components";
import { DefaultHeader, SUCCESS } from "../constants";
import { useTheme } from "../contexts/ThemeProvider";
import { BareUserData, UserDataModal, UserResponse } from "../modals";

import styles from "../styles/pages/main/index.module.scss";

export default function Home() {
    // getting the theme data
    const { theme } = useTheme();

    // state starts here
    // the actual search text state
    const [searchText, setSearchText] = useState<string>("");
    // list of users from the database
    const [userData, setUserData] = useState<Array<UserDataModal>>([BareUserData]);

    // wheather to show the add user UI or card
    // initial value if false since we don't want it to be rendered on page loaded
    const [showAdd, setShowAdd] = useState<boolean>(false);
    // sets wheather to show the edit menu and also which user to edit
    // the initial value is actually null in case of rendering
    const [showEdit, setShowEdit] = useState<UserDataModal>(BareUserData);

    // from the initial website load state
    // we will be loading the users
    useEffect(() => {
        fetch("/api/main/getusers", {
            method: "POST",
            headers: {
                ...DefaultHeader,
            },
        })
            .then((res) => res.json())
            .then((res: any) => {
                const { data, code }: UserResponse = res;
                if (code === SUCCESS && data.length > 0) {
                    setUserData(res.data);

                    toast(`Loaded ${data.length} user's data.`, {
                        type: "success",
                    });
                } else {
                    toast(
                        "Couldn't load user data. Please check your internet connection",
                        {
                            type: "info",
                        }
                    );
                }
            })
            .catch((err) => {
                console.log(err);
                toast("Couldn't load user data. Please check your internet connection", {
                    type: "info",
                });
            });
    }, []);

    // when the user data is updated in the database we will just also update it in local
    // so that the frontend seems it is working in realtime
    const updateUserLocally = (updatedUser: UserDataModal) => {
        // itterate over the array of the user data and find the user data provided
        // and update it
        const localUpdatedUsersList: UserDataModal[] = userData.map((user) => {
            if (user.uid === updatedUser.uid) {
                return updatedUser;
            }

            return user;
        });
        // setting the updated user's list to the main state of the page...
        setUserData(localUpdatedUsersList);
    };

    // when any new user is added to the database
    // we will not make a new api request instead we can just append the user data array
    const addNewUserLocally = (newUserData: UserDataModal) => {
        // local user data is
        // const localUserData = userData;
        // localUserData.push(newUserData); // adding the new user data to the current list of user data
        // // setting the latest data to the state now...
        // setUserData(localUserData);
        setUserData((value) => {
            value.push(newUserData);
            return value;
        });
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Test Website</title>
                <meta
                    name="description"
                    content="this is a test website for interview."
                />
                <meta
                    name="keywords"
                    content="test website, sobhanbera, sobhan, interview, question, assignments, task"
                />
            </Head>

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme ? "light" : "dark"}
            />

            <h1>
                Admin Portal
                <AiOutlinePlus onClick={() => setShowAdd(true)} />
            </h1>

            <div className={styles.mainContainer}>
                <div className={styles.searchBarContainer}>
                    <SearchBar searchText={searchText} setSearch={setSearchText} />
                </div>

                <div className={styles.userListContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>Serial No.</th>
                                <th>Email</th>
                                <th>Fullname</th>
                                <th>Mobile No.</th>
                                <th>Created On</th>
                                <th>Last Edited On</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {userData?.map((user, index) => {
                                // implementation for search feature...
                                if (
                                    user.firstname
                                        .toLowerCase()
                                        .indexOf(searchText.toLowerCase()) <= -1 &&
                                    user.lastname
                                        .toLowerCase()
                                        .indexOf(searchText.toLowerCase()) <= -1 &&
                                    user.email
                                        .toLowerCase()
                                        .indexOf(searchText.toLowerCase()) <= -1
                                )
                                    return null;

                                return (
                                    <UserRow
                                        key={user.uid}
                                        user={user}
                                        index={index}
                                        toggleEdit={() => setShowEdit(user)}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <UserAdd
                showAddNewUserPanel={showAdd}
                cancelAddingNewUser={() => setShowAdd(false)}
                addNewUser={(userData: UserDataModal) => addNewUserLocally(userData)}
            />

            <UserEdit
                user={showEdit}
                cancelEdit={() => setShowEdit(BareUserData)}
                setUser={(userData: UserDataModal) => updateUserLocally(userData)}
            />
        </div>
    );
}

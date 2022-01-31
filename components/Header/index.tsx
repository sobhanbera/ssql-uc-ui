import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { HamburgerIcon, ThemeToggler } from "../";
import styles from "../../styles/components/Header/index.module.scss";
import { useTheme } from "../../contexts/ThemeProvider";

export default function Header() {
    const router = useRouter();
    const [menuOpened, setMenuOpened] = useState(false); // if the menu is opened the value will be true else false
    const { theme, toggleTheme } = useTheme();

    // whenever the route changes we must hide the header menu or it will effect the UX
    useEffect(() => {
        setMenuOpened(false);
    }, [router.pathname]);

    // function to toggle the header menu when the screen size is small
    const toggleMenu = () => {
        setMenuOpened((value) => !value);
    };

    return (
        <header className={styles.header}>
            <div className={styles.mainHeaderContainer}>
                {/* the hamburger icon to open menu in small screens */}
                <HamburgerIcon
                    extraClassnames={styles.headerHamburgerMenuIcon}
                    toggleMenu={toggleMenu}
                    menuOpened={menuOpened}
                />

                {/* website's logo */}
                <span className={styles.logoSpan}>
                    <Link href="/">
                        <a>
                            <p>
                                <span>Company Long Form</span>
                                <span>Short Form1</span>
                                <span>Short Form2</span>
                            </p>
                        </a>
                    </Link>
                </span>

                {/* the actual navigation section */}
                <nav className={`${menuOpened ? styles.menuActive : ""}`}>
                    <ul>
                        <li>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a>Tab2</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a>Tab3</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a>Tab4</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a>Tab5</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/">
                                <a>More</a>
                            </Link>
                        </li>

                        {/* first theme toggler for large screens */}
                        <li>
                            <button onClick={() => toggleTheme()}>
                                <ThemeToggler />
                            </button>
                        </li>
                    </ul>
                </nav>

                {/**
                 * extra div just to center everything in the view
                 * so instead of making this like bare div we can just set a theme toggling button here*/}
                <div className={styles.extraCenteringDiv}>
                    <button onClick={() => toggleTheme()}>
                        <ThemeToggler />
                    </button>
                </div>
            </div>
        </header>
    );
}

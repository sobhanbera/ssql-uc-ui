import styles from "../../styles/components/HamburgerIcon/index.module.scss";

interface HamburgerIconProps {
    menuOpened: boolean;
    toggleMenu(): any;
    extraClassnames: any;
}
export default function HamburgerIcon(props: HamburgerIconProps) {
    return (
        <div
            className={`${props.extraClassnames} ${styles.hamburgerIcon} ${
                props.menuOpened ? styles.opened : ""
            }`}
            onClick={props.toggleMenu}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

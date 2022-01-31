import type { AppProps } from "next/app";

import ThemeProvider from "../contexts/ThemeProvider";
import { Header } from "../components";
import { HEADER_HEIGHT } from "../constants";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <Header />

            {/* bare div just to say that user have scrolled or not */}
            <div
                style={{
                    height: `${HEADER_HEIGHT}px`,
                }}
            ></div>

            <div className={"main-content"}>
                <Component {...pageProps} />
            </div>
        </ThemeProvider>
    );
}

export default MyApp;

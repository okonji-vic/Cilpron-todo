// import React from "react";
import { Link } from "react-router-dom";

const Custom404 = () => {
    return (
        <>
        <h1>404 - Page Not Found</h1>
        <Link to="/">
            <button>Go back to home</button>
        </Link>
        </>
    );
    };

export default Custom404;
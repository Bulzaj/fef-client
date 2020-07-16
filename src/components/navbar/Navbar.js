import React from "react";
import classes from './Navbar.module.css'
import * as links from '../../utils/links';

const Navbar = (props) => {

    return (
        <nav className={classes.Navbar}>
            <h1>{props.title}</h1>
            <a href={links.GITHUB_BACKEND}>Source code</a>
        </nav>
    )
}
export default Navbar;
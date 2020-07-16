import React from "react";
import classes from './Box.module.css'

const Box = (props) => {
    return (
        <div className={classes.Box}>
            <h1>{props.children}</h1>
        </div>
    )
}

export default Box;
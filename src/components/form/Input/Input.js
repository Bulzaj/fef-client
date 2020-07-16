import React from "react";
import classes from './Input.module.css';

const Input = (props) => {
    if (props.type === 'submit') {

    }
    return (
        <input
            className={classes.Input}
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChangeHandler}/>
    );
}

export default Input
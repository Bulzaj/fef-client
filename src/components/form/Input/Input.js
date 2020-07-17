import React from "react";
import classes from './Input.module.css';

const Input = (props) => {
    return (
        <input
            {...props}
            className={classes.Input}
            name={props.name}
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChangeHandler}/>
    );
}

export default Input
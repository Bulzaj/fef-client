import React from "react";

const Form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {props.children}
        </form>
    )
}

export default Form;
import React from "react";
import Button from "./style";

const DetourButton = ({ children, ...rest }) => {
    // variant = {variant} border = {border} size = {size} color = {color}
    return <Button {...rest}>{children}</Button>;
};

export default DetourButton;

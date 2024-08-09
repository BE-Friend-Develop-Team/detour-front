import React from "react";
import Button from "./style";

const DetourButton = ({ children, ...rest }) => {
    return <Button {...rest}>{children}</Button>;
};

export default DetourButton;

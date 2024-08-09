import React, { useState } from "react";

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChangeValue = (e) => {
        setValue(e.target.value);
    };

    return [value, setValue, onChangeValue];
};

export default useInput;

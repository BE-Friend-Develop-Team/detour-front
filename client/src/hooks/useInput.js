import React, { useState } from "react";

// useInput("초기값")
const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChangeValue = (e) => {
        setValue(e.target.value);
    };
    // console.log(onChangeValue)

    return [value, setValue, onChangeValue];
};

export default useInput;

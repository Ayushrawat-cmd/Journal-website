import { useState } from "react";


const useInput = (validateValue: any)=>{
    const [enteredValue, setValue] = useState("");
    const [isTouched,setIsTouched] = useState(false);
    const enterValueIsValid = validateValue(enteredValue) as Boolean;
    const hasError = !enterValueIsValid && isTouched;
    const inputValueHandler = (event:any)=>{
        console.log(enterValueIsValid)
        setValue(event.target.value);
    };
    const valueInputBlurHandler = (event:any)=>{
        setIsTouched(true);
    };
    const reset = ()=>{
        setIsTouched(false);
        setValue('');
    };
    return {
        value: enteredValue,isValid: enterValueIsValid,reset, hasError, inputValueHandler, valueInputBlurHandler
    };
}

export default useInput;
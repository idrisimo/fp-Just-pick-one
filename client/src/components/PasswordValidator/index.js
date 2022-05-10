import React from "react";


export function PasswordValidator({validity: {minChar}}) {

    return(
        <div id="password-check">
            <p>Password must contain:</p>
            <ul>
                <StrengthValidator isValid={minChar} text="At least 8 characters"/>
               
            </ul>
        </div>
    )

} 


const StrengthValidator = ({ isValid, text }) => {

    if(isValid === true){
    return (
        <li style={{color: "green"}}>
            {text}
        </li>
    )} else {
        return (
            <li>
                {text}
            </li>)
    }
}
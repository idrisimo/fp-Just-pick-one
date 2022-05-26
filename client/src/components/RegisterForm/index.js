import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginFunction, registerFunction } from "../../actions";
import { PasswordValidator } from "../PasswordValidator";


const isNumberRegx = /\d/;

export function RegisterForm() {

    const navigateTo = useNavigate();

    const [password, setPassword] = useState();
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [passwordValidity, setPasswordValidity] = useState({
        minChar: null, 
       
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [formInput, setFormInput] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    
    const updateInput = e => {
        setPassword(formInput.password);
        setPasswordValidity({
            minChar: formInput.password.length >= 7 ? true : false,
           
        })
        setError();
        const input = e.target.value;
        return setFormInput((prev) => ({ ...prev, [e.target.name]: input }))
    }

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const register = await registerFunction(formInput)
            if (register === "Successful registration"){
            await loginFunction(formInput)
            navigateTo('/Login')
            } else {
                throw new Error('Unsuccessful registration')
            }
        } catch(err) {
            setLoading(false)
            setError(err.message)
            
        }
    }



    return(
        <>
        <img id="login-reg-logo" src='https://i.ibb.co/StfbjGd/2022-05-06-6.png'/>

        <form aria-label="registerForm" id="regForm" onSubmit={handleSubmit}>

            <main>
            <label htmlFor="Username">Username:</label>
            <input type="text" aria-label="Username" name="username" required onChange={updateInput}/><br/>

            <label htmlFor="Email">Email:</label><br/>
            <input type="email" aria-label="Email" name="email" required onChange={updateInput}/>

            <label htmlFor="Password">Password:</label>
            <input type="password" aria-label="Password" name="password" required onFocus={() => setPasswordFocused(true)} onChange={updateInput}/>
            { passwordFocused && <PasswordValidator validity={passwordValidity} />}

            <label htmlFor="ConfirmPassword">Confirm Password:</label>
            <input type="password" aria-label="ConfirmPassword" name="confirmPassword" required onChange={updateInput} pattern={password}/>

            <input type="submit" className="submitBtn" value="Register" style={{cursor: 'pointer'}}/>

            <p id="change" onClick={() => navigateTo('/Login')} style={{cursor: 'pointer'}}>Already have an account? Login here!</p>
            </main>

            {error && (
                <div data-testid="error" id="error">
                    {error}
                </div>
            )}

        {loading && (
            <div id="loading">
                Registering Account . . .
            </div>
        )}

        </form>
      

        </>
    )


}


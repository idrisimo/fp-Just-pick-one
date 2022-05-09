import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginFunction, registerFunction } from "../../actions";

export function RegisterForm() {

    const goTo = useNavigate();

    const [password, setPassword] = useState();
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
        setError();
        const value = e.target.value;
        return setFormInput((prev) => ({ ...prev, [e.target.name]: value }))
    }

   
    
    const handleSubmit = async(e) => {
        e.prevent.default();
        await registerFunction(formInput)
        await loginFunction(formInput)
        if(localStorage.length) {
            goTo('/UserAccount')
        } else {
            setErrorMessage('User already exists!')
        }
    }



    return(
        <>
        <form aria-label="registerForm" id="regForm" onSubmit={handleSubmit}>
            <label htmlFor="Username">Username:</label>
            <input type="text" aria-label="Username" name="username" required onChange={updateInput}/>
            <label htmlFor="Email">Email:</label>
            <input type="email" aria-label="Email" name="email" required onChange={updateInput}/>
            <label htmlFor="Password">Password:</label>
            <input type="password" aria-label="Password" name="password" required onChange={updateInput}/>
            <label htmlFor="ConfirmPassword">Confirm Password:</label>
            <input type="password" aria-label="ConfirmPassword" name="confirmPassword" required onChange={updateInput} pattern={password}/>
            <input type="submit" className="submitBtn" value="Login" />
            <p id="change" onClick={() => goTo('/Login')} style={{cursor: 'pointer'}}>Already have an account? Login here!</p>
        </form>
        {loading && (
            <div id="loading">
                Registering Account . . .
            </div>
        )}
        </>
    )


}


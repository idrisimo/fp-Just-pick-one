import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginFunction, registerFunction } from "../../actions";

export function RegisterForm() {

    const navigateTo = useNavigate();

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
        const input = e.target.value;
        return setFormInput((prev) => ({ ...prev, [e.target.name]: input }))
    }

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            setLoading(true);
            console.log(formInput)
            const register = await registerFunction(formInput)
            console.log(register)
            if (register === "Successful registration"){
            await loginFunction(formInput)
            navigateTo('/Login')
            } else {
                setErrorMessage('User already exists!')
            }
        } catch(err) {
            setLoading(false)
            setError(err.message)
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

            <input type="submit" className="submitBtn" value="Register" style={{cursor: 'pointer'}}/>

            <p id="change" onClick={() => navigateTo('/Login')} style={{cursor: 'pointer'}}>Already have an account? Login here!</p>

        </form>
        
        {loading && (
            <div id="loading">
                Registering Account . . .
            </div>
        )}

        </>
    )


}


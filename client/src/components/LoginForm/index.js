import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginFunction } from "../../actions";
import { useLogin } from "../../context/LoginProvider";

export function LoginForm() {

    const navigateTo = useNavigate();
    const {setIsLoggedIn} = useLogin()

    const [formInput, setFormInput] = useState({username:"", password:""});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    

    const updateInput = e => {
        const input = e.target.value;
        return setFormInput((prev) => ({ ...prev, [e.target.name]:input }))
    }


    const handleSubmit = async(e) => {
            e.preventDefault();
            try {
                setLoading(true);
                console.log(formInput)
                const login = await loginFunction(formInput);
                console.log(login)
                if(login === "Successful Login") {
                    navigateTo("/UserAccount")
                    setIsLoggedIn(true)
                } else {
                    throw new Error(login)
                }
            } catch(err) {
                setLoading(false)
                setError(err.message)
            }
    }


    return(
        <>
        <form aria-label="form" id="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="Username">Username:</label>
            <input type="text" aria-label="Username" name="username" onChange={updateInput} required />
            <label htmlFor="Password">Password:</label>
            <input type="password" aria-label="Password" name="password" onChange={updateInput} required/>
            <input type="submit" className="submitBtn" value="Login" style={{cursor: 'pointer'}}/>
            <p id="change" onClick={() => navigateTo('/Register')} style={{cursor: 'pointer'}}>Don't have an account yet? Register here!</p>
        </form>
        {loading && (
            <div id="loading">
                Logging in . . .
            </div>
        )}
        </>
    )
}

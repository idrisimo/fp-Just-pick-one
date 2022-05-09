import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginFunction } from "../../actions";

export function LoginForm() {

    const navigateTo = useNavigate();

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
                const login = await loginFunction(formInput);
                if(login === "Successful login") {
                    navigateTo("/UserAccount")
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
            <input type="text" aria-label="Username" name="username" required onChange={updateInput}/>
            <label htmlFor="Password">Password:</label>
            <input type="password" aria-label="Password" name="password" required onChange={updateInput}/>
            <input type="submit" className="submitBtn" value="Login"/>
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
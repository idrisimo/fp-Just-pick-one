import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginFunction } from "../../actions";
import { useLogin } from "../../context/LoginProvider";
import "./index.css"

export function LoginForm() {

    const navigateTo = useNavigate();
    const setIsLoggedIn = useLogin()

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
        <form aria-label="form" role="form" id="loginForm" name="loginForm" onSubmit={handleSubmit}>
            <main>
            <label htmlFor="Username">Username:</label>
            <input id="input-username" type="text" aria-label="Username" name="username" onChange={updateInput} required />
            <label htmlFor="Password">Password:</label>
            <input type="password" aria-label="Password" name="password" onChange={updateInput} required/><br/>
            <input type="submit" aria-label="Submit" className="submitBtn" value="Login" style={{cursor: 'pointer'}}/>
            <p id="change" onClick={() => navigateTo('/Register')} style={{cursor: 'pointer'}}>Don't have an account yet? Register here!</p>
            </main>
            {/* <div>
                <label htmlFor="my-input">Example:</label>
                <input id="my-input" type="text" value="This is a bad example" />
            </div> */}
            {error && (
            <div data-testid="error" id="error">
              Incorrect Username or Password
            </div>
          )}

            {loading && (
            <div data-testid="loading" id="loading">
                Logging in . . .
            </div>
        )}
        </form>
      
        </>
    )
}

import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginFunction } from "../../actions";

export function LoginForm() {

    const goTo = useNavigate();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        await loginFunction(e);
    }

    const updateUsername = e => {
        const input = e.target.value;
        setUsername(input)
    }

    const updatePassword = e => {
        const input = e.target.value;
        setPassword(input)
        console.log(setPassword)
    }

    return(
        <>
        <form aria-label="form" id="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="Username">Username:</label>
            <input type="text" aria-label="Username" name="username" required onChange={updateUsername}/>
            <label htmlFor="Password">Password:</label>
            <input type="password" aria-label="Password" name="password" required onChange={updatePassword}/>
            <input type="submit" className="submitBtn" value="Login"/>
            <p id="change" onClick={() => goTo('/Register')} style={{cursor: 'pointer'}}>Don't have an account yet? Register here!</p>
        </form>
        {loading && (
            <div id="loading">
                Logging in . . .
            </div>
        )}
        </>
    )
}
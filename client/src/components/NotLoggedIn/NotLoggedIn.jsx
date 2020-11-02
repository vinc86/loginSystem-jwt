import React from 'react'
import { useHistory } from 'react-router-dom'

export default function NotLoggedIn() {

    const history = useHistory();

    return (
        <div className="home-no-user">
            <p><button onClick={()=>history.push("/login")} className="home-btn">Login</button> or <button onClick={()=>history.push("/register")} className="home-btn">Register</button></p>
            <p>to see our wonderful world!</p> 
        </div>
    )
}

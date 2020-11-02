import axios from "axios";
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";


export default function Login() {

    const history = useHistory()
    const [credentials, setCredentials] = useState([])
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const onChange =(e)=>{
       
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
    const submitRegister = async (e)=>{
        e.preventDefault()
       axios.post("/users/register", credentials)
       .then( res => {
           setError();
           history.push("/login")
           setMessage(res.data.message)
        })
       .catch( error =>{
        setError(error.response.data.error)
        setMessage()
       })
    }
    return (
        <div className="login-container">
            <h2 style={{marginBottom: "20px"}}>REGISTER</h2>
                {error && <p style={{color: "red"}}>{error}</p>}
                {message && <p style={{color: "green"}}>{message}</p>}
            <form onSubmit={(e)=>submitRegister(e)}>
                <input onChange={onChange} type="email" name="email" placeholder="Email"/>
                <input onChange={onChange} type="text" name="username" placeholder="Username"/>
                <input onChange={onChange} type="password" name="password" placeholder="password" />
                <input onChange={onChange} type="password" name="confirmPassword" placeholder="Confirm password" />
                <button className="action-btn">Register</button> 
                <p>Already registered? <button onClick={()=>history.push("/login")} className ="to-login-or-register">Login</button></p>
            </form>
        </div>
    )
}
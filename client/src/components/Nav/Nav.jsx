import React from 'react'
import { Link } from 'react-router-dom'
import Buttons from '../auth/Buttons'

export default function Nav() {
    return (
        <div className="nav">
            <Link to ="/"><h1>MyApp</h1></Link>
            
            <Buttons />
        </div>
    )
}

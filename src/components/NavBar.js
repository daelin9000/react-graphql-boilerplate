// src/components/NavBar.js

import React from "react"
import { Link } from "react-router-dom"
import { useAuth0 } from "../wrappers/react-auth0-wrapper"
import { Button, Menu, MenuItem } from 'react-foundation'

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

    return (
        <div>
            <Menu>
                <MenuItem><Link to="/external-api">External API</Link></MenuItem>
                <MenuItem><Link to="/">Home</Link></MenuItem>
                <MenuItem><Link to="/posts">Posts</Link></MenuItem>
                {isAuthenticated && <MenuItem><Link to="/profile">Profile</Link></MenuItem>}
                <MenuItem>
                    {isAuthenticated
                        ? <Button onClick={() => logout()}>Log out</Button>
                        : <Button onClick={() => loginWithRedirect({})}>Log in</Button>
                    }
                </MenuItem>
            </Menu>
        </div>
    )
}

export default NavBar
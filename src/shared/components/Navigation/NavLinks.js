import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {

    let auth = useContext(AuthContext);

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>Home Page</NavLink>
        </li>
        {auth.isLoggedIn && (<li>
            <NavLink to="/users/add">Add User</NavLink>
        </li>
        )}

        {!auth.isLoggedIn && (<li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
        )}

        <li>
            <NavLink to='/users/list'>All Users </NavLink>
        </li>

        {auth.isLoggedIn && (
            <li>
                <NavLink to='/sensors'>Sensor Data Fetch </NavLink>
            </li>
        )}

        {auth.isLoggedIn && (
            <button onClick={auth.logout}>LOG-OUT</button>
        )}
    </ul>
};

export default NavLinks;
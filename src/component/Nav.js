import { NavLink } from 'react-router-dom';
import React from 'react';
import './Component.css';

function Nav() {
    return (
        <div>
            <div className="navbar">
                <NavLink className="navbarMenu" activeClassName="active" exact to="/">
                    메인
                </NavLink>
                <NavLink className="navbarMenu" activeClassName="active" to="/Ranking">
                    랭킹
                </NavLink>
                <NavLink className="navbarMenu" activeClassName="active" to="/Percentage">
                    확률
                </NavLink>
            </div>
        </div>
    );
}

export default Nav;

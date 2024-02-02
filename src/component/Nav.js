import { NavLink } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';


export default function Nav() {
    return (
        <Container>
            <Navbar>
                <Navmenu activeClassName = "active" exact to="/">
                    메인
                </Navmenu>
                <Navmenu activeClassName = "active" exact to="/Ranking">
                    랭킹
                </Navmenu>
                <Navmenu activeClassName = "active" exact to="/Percentage">
                    확률
                </Navmenu>
            </Navbar>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    background-color: rgba(39, 40, 46);
    padding: 11px 0px;
    align-item: center;
    justify-content: center;
`;

const Navbar = styled.div`
    font-size: 15px;
    color: white;
    
`;

const Navmenu = styled(NavLink)`
    font-size: 15px;
    word-spacing: 20px;
    color: white;
    margin: 40px;
    text-decoration: none;
    &.active{
        text-decoration: underline;
    }
`;


//<div>
//            <div className="navbar">
 //               <NavLink className="navbarMenu" activeClassName="active" exact to="/">
 //                   메인
 //               </NavLink>
 //               <NavLink className="navbarMenu" activeClassName="active" to="/Ranking">
  //                  랭킹
  //              </NavLink>
  //              <NavLink className="navbarMenu" activeClassName="active" to="/Percentage">
  //                  확률
  //              </NavLink>
  //          </div>
  //      </div>
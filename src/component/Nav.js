import { NavLink } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

export default function Nav() {
    return (
        <Container>
            <Navbar>
                <Navi activeClassName="active" exact to="/">
                    메인
                </Navi>
                <Navi activeClassName="active" to="/Ranking">
                    랭킹
                </Navi>
                <Navi activeClassName="active" to="/Percentage">
                    확률
                </Navi>
            </Navbar>
        </Container>
    );
}

const Container = styled.div`
    background-color: rgba(39, 40, 46);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 7px 0px;
`;

const Navbar = styled.div`
    font-size: 13px;
    color: white;
    margin: 8px;
    gap: 5vw;
`;

const Navi = styled(NavLink)`
    word-spacing: 20px;
    font-size: 13px;
    color: white;
    margin: 8px;
    text-decoration: none;
    &.active {
        text-decoration: underline;
    }
`;

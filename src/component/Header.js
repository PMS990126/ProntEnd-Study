import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
    return (
        <Container>
            <NavLink to="/">
                <HeaderText>MAPLE.GG</HeaderText>
            </NavLink>
        </Container>
    );
}

const Container = styled.div`
    background-color: rgba(33, 34, 39);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    width: 100%;
    line-height: 1.5;
    a {
        text-decoration: none;
        color: white;
        &:visited {
            color: white;
        }
        &:hover {
            color: white;
        }
        &:active {
            color: white;
        }
    }
`;
const HeaderText = styled.div`
    font-size: 30px;
    color: white;
    font-family: 'Maplestory Bold';
`;

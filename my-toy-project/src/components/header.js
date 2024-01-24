import { NavLink } from "react-router-dom"
import styled from 'styled-components';
import logo from "../images/logo.png"
import "../font.css"

export default function Header() {
    return (
        <Container>
            <NavLink to = {"/Home"} style = {{display: "flex", textDecoration: "none"}}>
                <LogoImg src={logo}></LogoImg>
                <LogoText>Maple.GG</LogoText>
            </NavLink>
        </Container>
    );
}

const Container = styled.div`
    background-color: #212227;
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoImg = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 5px;
`;

const LogoText = styled.div`
    color: white;
    font-size: 30px;
    font-family: maple-font;

    &:hover {
        color: #D06137;
    }
`;
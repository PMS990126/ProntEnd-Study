import { NavLink } from "react-router-dom"
import styled from 'styled-components';

export default function NavBar() {
    return (
        <Container>
            <Navbar>
                <Navi to = {""}>공지사항</Navi>
                <Navi to = {""}>가이드</Navi>
                <Navi to = {""}>랭킹</Navi>
                <Navi to = {""}>시뮬레이터</Navi>
            </Navbar>
        </Container>
    );
}

const Container = styled.div`
    background-color: #38393D;
    width: 100%;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Navbar = styled.div`
    display: flex;
    justify-content: center;
    gap: 5vw;
`;

const Navi = styled(NavLink)`
    font-size: 15px;
    font-family: maple-font;
    color: white;
    text-decoration: none;

    &:hover {
        font-size: 20px;
        color: #5CB85C;
    }
`;
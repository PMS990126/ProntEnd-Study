import { NavLink } from "react-router-dom"
import styled from 'styled-components';
import logo from "../images/logo_ver2.png";

export default function Home() {
    return (
        <Container>
            <NavLink to = {"/Home"} style = {{display: "flex", textDecoration: "none", alignItems: "center"}}>
                <TitleImg src={logo}></TitleImg>
                <TitleText>Maple.GG</TitleText>
            </NavLink>
            <SearchBar>
                <InputField type="text" placeholder="캐릭터 또는 길드명을 입력하세요."/>
                <SearchButton type="submit">검색</SearchButton>
            </SearchBar>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10vh;
    flex-direction: column;
`;

const TitleImg = styled.img`
    width:75px;
    height: 75px;
    margin-right: 10px;
    transition: transform 10s;

    &:hover {
        width: 100px;
        height: 100px;
        transform: rotate(3600000deg);
    }
`;

const TitleText = styled.div`
    color: black;
    font-size: 50px;
    font-family: maple-font;

    &:hover {
        color: #FFB8AF;
    }
`;

const SearchBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2.5vh;
`;

const InputField = styled.input`
    width: 25vw;
    height: 3vh;
    padding: 10px;
    font-size: 20px;
    border: 3px solid #F6A730;
    border-radius: 10px;

    ::placeholder { 
        color: #EFEFEF; 
    }

    &:focus {
        border-color: #5CB85C; 
        outline: none; 
    }
`;

const SearchButton = styled.button`
    cursor: pointer;
    margin-left: 10px;
    width: 6vw;
    height: 6vh;
    border: none;
    border-radius: 5px;
    padding: 5px;
    font-size: 15px;
    font-weight: bold;
    background-color: #5CB85C;
    color: white;
`;
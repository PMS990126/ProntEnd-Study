import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom"
import styled from 'styled-components';
import logo from "../images/logo_ver2.png";
import wonki from "../images/main_img.png";
import mapleLink from "../images/maplestory.png";
import invenLink from "../images/mapleInven.png";
import ggLink from "../images/mapleGG.png";
import mapleHover from "../images/mapleHover.png";
import invenHover from "../images/invenHover.png";
import ggHover from "../images/ggHover.png";


export default function Home() {
    const navigate = useNavigate(); // 페이지 이동 훅 

    const today = new Date(); // 오늘 날짜 가져오기
    const dateString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`; // 날짜를 문자열로 변환

    const [input, setInput] = useState(""); // 사용자의 입력값 관리

    const handleSearch = (event) => { // 검색결과 페이지로 파라미터 전달
        event.preventDefault(); 
        navigate(`/searchPage?date=${dateString}&input=${input}`); // 검색날짜와 사용자 입력값 전달
    };
    return (
        <Container>
            <NavLink to = {"/Home"} style = {{display: "flex", textDecoration: "none", alignItems: "center"}}>
                <TitleImg src={logo}></TitleImg>
                <TitleText>Maple.GG</TitleText>
            </NavLink>
            <SearchBar onSubmit={handleSearch}>
                <InputField type="text" value={input} onChange={event => setInput(event.target.value)} placeholder="캐릭터 또는 길드명을 입력하세요."/>
                <SearchButton type="submit">검색</SearchButton>
            </SearchBar>
            <LinkContainer>
                <LinkBox href="https://maplestory.nexon.com/Home/Main" target="_blank" rel="noreferrer">
                    <LinkImg src={mapleLink} hoverSrc={mapleHover}></LinkImg>
                    <LinkText>메이플스토리</LinkText>
                </LinkBox>
                <LinkBox href="https://maple.inven.co.kr/" target="_blank" rel="noreferrer">
                    <LinkImg src={invenLink} hoverSrc={invenHover}></LinkImg>
                    <LinkText>메이플 인벤</LinkText>
                </LinkBox>
                <LinkBox href="https://maple.gg/" target="_blank" rel="noreferrer">
                    <LinkImg src={ggLink} hoverSrc={ggHover}></LinkImg>
                    <LinkText>메이플GG</LinkText>
                </LinkBox>
            </LinkContainer>
            <RotationImg src={wonki}></RotationImg>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5vh;
    flex-direction: column;
`;

const TitleImg = styled.img`
    width:75px;
    height: 75px;
    margin-right: 10px;
`;

const TitleText = styled.div`
    color: black;
    font-size: 50px;
    font-family: maple-font;

    &:hover {
        color: #FFB8AF;
    }
`;

const SearchBar = styled.form`
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

const RotationImg = styled.img`
    margin-top: 5vh;
    width: 200px;
    height: 200px;
    transition: transform 10s;

    &:hover {
        transform: rotate(3600000deg);
    }
`;

const LinkContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5vh;
`;

const LinkBox = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
`;

const LinkImg = styled.div`
    width:75px;
    height: 75px;
    margin-left: 5vw;
    margin-right: 5vw;
    border-radius: 50%;
    background-image: url(${props => props.src});
    background-size: cover;
    transition: background-image 0.5s;

    &:hover {
        background-image: url(${props => props.hoverSrc});
    }
`;

const LinkText = styled.div`
    margin-top: 1vh;
    font-size: 15px;
    text-align: center;
    font-family: maple-font;
    color: black;
`;
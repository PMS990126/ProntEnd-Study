import React, { useState } from 'react';
import "./Component.css";
import styled from 'styled-components';
import slime from "../picture/slime.png";
import backgroundImage from "../picture/perion.png";
import { NavLink, useNavigate } from 'react-router-dom';


export default function Main() {

    const Navigate = useNavigate();

    const [input, setInput] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        Navigate(`/SearchPage?input=${input}`);
    };

    return (
        <MainContainer>
            <TitleContainer to = {'/'}>
                <TitleImage src = {slime} alt = "slime" />
                <TitleText>MAPLE.GG</TitleText>
            </TitleContainer>
            <SearchContainer onSubmit={handleSearch}>
                <SearchBar value={input} onChange={setInput = event => (event.target.value)} placeholder="캐릭터명을 입력하세요." />
                <SearchButton type="submit">검색</SearchButton>
            </SearchContainer>
        </MainContainer>
    );
}




const MainContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    position: relative;
    flex-direction: column-reverse;
    background: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin: 0 auto;
`;

const TitleContainer = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
`;

const TitleImage = styled.img`
    width: 50px;
    height: 50px;

`;

const TitleText = styled.div`
    font-size: 60px;
    font-family: Maplestory Bold;
    
    align-items: center;
    justify-content: center;
    color: black;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;    
`;

const SearchBar = styled.input`
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 8px;
`;

const SearchButton = styled.button`
    padding: 8px 16px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;


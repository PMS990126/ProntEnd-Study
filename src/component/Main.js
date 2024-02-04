import { useState } from 'react';
import React from 'react';
import "./Component.css";
import styled from 'styled-components';
import slime from "../picture/slime.png";
import backgroundImage from "../picture/perion.png";
import { NavLink, useNavigate } from 'react-router-dom';


function Main() {

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const today = new Date(); 
    today.setDate(today.getDate() - 1); 
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0'); 
    const dateString = `${today.getFullYear()}-${month}-${date}`;

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/SearchPage?date=${dateString}&input=${searchQuery}`);
    }

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <MainContainer>
            <TitleContainer to = {'/'}>
                <TitleImage src = {slime} alt = "slime" />
                <TitleText>MAPLE.GG</TitleText>
            </TitleContainer>
            <SearchContainer onSubmit={handleSearch}>
                <SearchBar type="text" value={searchQuery} onChange={handleChange} placeholder="캐릭터명 또는 길드명을 입력하세요." />
                <SearchButton type="submit">검색</SearchButton>
            </SearchContainer>
        </MainContainer>
    );
}

export default Main;



const MainContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    justify-content: flex-start;
    position: relative;
    flex-direction: column;
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
    margin-top: 20vh;
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
    align-items: center;
    justify-content: space-around;
    flex-direction: column;  
`;

const SearchBar = styled.input`
    padding: 8px 60px;
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


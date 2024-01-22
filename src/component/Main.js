import React from 'react';
import styled from 'styled-components';
import './font.css';
import mushroomImage from '../picture/Orange_Mushroom.png'; // 이미지 불러오기
import backgroundImage from '../picture/Elluel.png'; // 백그라운드 이미지 불러오기

function Main() {
    return (
        <MainContainer>
            <TitleContainer>
                <TitleImage src={mushroomImage} alt="Orange Mushroom" />
                <TitleText>maple.GG</TitleText>
            </TitleContainer>
            <SearchContainer>
                <SearchBar type="text" placeholder="캐릭터 또는 길드명을 입력하세요." />
                <SearchImage src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" alt="Search" />
            </SearchContainer>
        </MainContainer>
    );
}
const Outbox = styled.div`
    background: url(${backgroundImage});
`;
const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    width: 300px;
    margin: 0 auto;
`;

const TitleContainer = styled.div`
    padding: 3vh;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
`;

const TitleText = styled.div`
    color: black;
    font-size: 40px;
    font-family: Maplestory Bold;
    margin-left: 10px;
`;

const TitleImage = styled.img`
    width: 30px;
    height: 30px;
`;

const SearchBar = styled.input`
    width: 100%;
    border: 1px solid #bbb;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
`;

const SearchImage = styled.img`
    position: absolute;
    width: 18px;
    height: 18px;
    top: 50%;
    right: 5px;
    margin: 0;
    cursor: pointer;
    transform: translateY(-50%);
`;
const BackgroundImage = styled.img`
    width: 100vw;
    height: 100vh;
`;
export default Main;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './font.css';
import mushroomImage from '../picture/Orange_Mushroom.png'; // 이미지 불러오기
import bgImg1 from '../picture/Elluel.png';
import bgImg2 from '../picture/Ellev.png';
import bgImg3 from '../picture/Arcana.png';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Main() {
    return (
        <MainContainer>
            <TitleContainer to={'/'}>
                <TitleImage src={mushroomImage} alt="Orange Mushroom" />
                <TitleText>maple.GG</TitleText>
            </TitleContainer>
            <SearchCharacter />
        </MainContainer>
    );
}

function SearchCharacter() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const today = new Date();

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault(); // form의 기본 이벤트인 페이지 리로드를 막습니다.
        const maple_api = process.env.REACT_APP_NEXON_OPEN_API;
        fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${encodeURIComponent(searchTerm)}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-nxopen-api-key': maple_api,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ocid) {
                    navigate(`/u/${data.ocid}`);
                } else {
                    alert('존재하지 않는 캐릭터 이름입니다');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <SearchContainer onSubmit={handleSearch}>
            <SearchBar type="text" placeholder="캐릭터 또는 길드명을 입력하세요" value={searchTerm} onChange={handleChange} />
            <SearchImage src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" alt="Search" onClick={handleSearch} />
        </SearchContainer>
    );
}

const backgroundArr = [bgImg1, bgImg2, bgImg3];
const randomIndex = Math.floor(Math.random() * backgroundArr.length);
const backgroundImage = backgroundArr[randomIndex];

const MainContainer = styled.div`
    padding-top:60px
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    width: 100vw;
    height:100vh;
    margin: 0 auto;
    background: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position:center;
    flex-grow: 1;
`;

const TitleContainer = styled(NavLink)`
    padding: 80px 20px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
`;

const TitleText = styled.div`
    color: black;
    font-size: 40px;
    font-family: Maplestory Bold;
    margin-left: 10px;
`;

const TitleImage = styled.img`
    width: 50px;
    height: 50px;
`;

const SearchContainer = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    padding: 10px;
`;

const SearchBar = styled.input`
    width: 100%;
    max-width: 300px;
    border: 1px solid #bbb;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
`;

const SearchImage = styled.img`
    position: relative;
    width: 18px;
    height: 18px;
    top: 50%;
    right: 30px;
    margin: 0;
    cursor: pointer;
`;

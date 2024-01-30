import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import loading from '../picture/주황버섯점프.gif';

export default function CharacterPage() {
    const { ocid } = useParams(); //URL의 파리미터에서 ocid(식별자)를 가져옴
    const [characterData, setCharacterData] = useState(null); //캐릭터의 데이터를 저장하는 상태
    const [popularityData, setPopularityData] = useState(null); //캐릭터의 인기도를 저장하는 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 나타내는 상태 변수

    const today = new Date();
    const year = today.getFullYear(); // 년도
    const month = ('0' + today.getMonth() + 1).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
    const date = ('0' + today.getDate()).slice(-2); // 날짜를 2자리로 만듭니다.
    const usingday = new Date(year, month, date - 1).toLocaleDateString;

    useEffect(() => {
        fetchCharacterData(ocid); //식별자를 이용해 캐릭터 데이터 불러오기
        fetchCharacterPopularityData(ocid); //식별자를 이용해 캐릭터 인기도 불러오기
    }, [ocid]);

    useEffect(() => {
        const timer = setIsLoading(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const fetchCharacterData = (ocid) => {
        const maple_api = process.env.REACT_APP_NEXON_OPEN_API;
        fetch(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}&date=${usingday}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-nxopen-api-key': maple_api,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCharacterData(data); //불러온 데이터를 상태에 저장
                setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
            })
            .catch((error) => console.error('Error:', error));
    };

    const fetchCharacterPopularityData = (ocid) => {
        const maple_api = process.env.REACT_APP_NEXON_OPEN_API;
        fetch(`https://open.api.nexon.com/maplestory/v1/character/popularity?ocid=${ocid}&date=${usingday}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-nxopen-api-key': maple_api,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPopularityData(data); //불러온 데이터를 상태에 저장
                setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
            })
            .catch((error) => console.error('Error:', error));
    };

    if (isLoading || !characterData) {
        return (
            <TitleText>
                <LoadingImg src={loading} alt="loading" />
                Loading...
            </TitleText>
        ); // 로딩 중일 때는 "Loading..." 메시지를 표시
    }

    return (
        <CharacterContainer>
            <CashItemContainer>
                <div>캐시아이템 api사용 구현 예정</div>
            </CashItemContainer>

            <CharacterImageContainer>
                <CharacterImage src={characterData.character_image} alt="ct" />
                <div>조회 기준일 : {usingday}</div>
            </CharacterImageContainer>

            <CharacterInfoContainer>
                <CharacterName>
                    {characterData.character_name}Guild: {characterData.character_guild_name}
                </CharacterName>
                <CharacterDetail>
                    Lv: {characterData.character_level} | Class: {characterData.character_class}
                </CharacterDetail>

                <CharacterDetail>EXP: {characterData.character_exp}</CharacterDetail>
            </CharacterInfoContainer>
        </CharacterContainer>
    );
}

const CharacterContainer = styled.div`
    padding-top: 60px;
    width: 20vw;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`;

const CharacterInfoContainer = styled.div``;

const CharacterImageContainer = styled.div`
    flex-direction: column;
`;

const CashItemContainer = styled.div`
    padding: 5px;
    width: 100px;
    height: 200;
    display: flex;
`;

const CharacterImage = styled.img`
    width: 100px;
    height: 200px;
`;

const CharacterName = styled.div`
    font-size: 20px;
    flex-direction: row;
`;

const TitleText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    color: black;
    font-size: 40px;
    font-family: Maplestory Bold;
    margin-left: 10px;
`;

const LoadingImg = styled.img`
    width: 100px;
    height: 100px;
    padding: 20px;
`;
const CharacterDetail = styled.div`
    /* 원하는 스타일을 적용합니다. */
`;

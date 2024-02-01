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
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
    const date = ('0' + today.getDate()).slice(-2); // 날짜를 2자리로 만듭니다.
    const usingday = new Date(year, month, date - 1).toLocaleDateString();

    useEffect(() => {
        fetchCharacterData(ocid); //식별자를 이용해 캐릭터 데이터 불러오기
        fetchCharacterPopularityData(ocid); //식별자를 이용해 캐릭터 인기도 불러오기
        fetchCharacterCashitemEquipmentData(ocid);
    }, [ocid]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const fetchCharacterData = (ocid) => {
        const maple_api = process.env.REACT_APP_NEXON_OPEN_API;
        fetch(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=431628398b08ed28405e09b986f97c2f&date=2024-01-31`, {
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
        fetch(`https://open.api.nexon.com/maplestory/v1/character/popularity?ocid=431628398b08ed28405e09b986f97c2f&date=2024-01-31`, {
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

    const fetchCharacterCashitemEquipmentData = (ocid) => {
        const maple_api = process.env.REACT_APP_NEXON_OPEN_API;
        fetch(`https://open.api.nexon.com/maplestory/v1/character/cashitem-equipment?ocid=431628398b08ed28405e09b986f97c2f&date=2024-01-31
`, {
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

    if (isLoading || !characterData||!popularityData) {
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
                <CashItemContainer>모자</CashItemContainer>
                <CashItemContainer>모자</CashItemContainer>
            </CashItemContainer>

            <CharacterImageContainer>
                <CharacterImage src={characterData.character_image} alt="ct" />
                <div>조회 기준일 : {usingday}</div>
            </CharacterImageContainer>

            <CharacterInfoContainer>
                <CharacterName>
                    {characterData.character_name} | {characterData.world_name	} 
                </CharacterName>
                <CharacterDetail>
                    Lv: {characterData.character_level} | {characterData.character_class} | 인기도 {popularityData.popularity} | {characterData.character_guild_name}
                </CharacterDetail>
            </CharacterInfoContainer>
        </CharacterContainer>
    );
}

const CharacterContainer = styled.div`

    padding: 80px 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`;

const CharacterInfoContainer = styled.div`
background-color: rgba(33, 34, 39);
flex-dirction:column;
`;

const CharacterImageContainer = styled.div`
    flex-direction: column;
`;

const CashItemContainer = styled.div`
    padding: 5px;
    width: 100px;
    height: 200px;
    display: flex;
`;

const CharacterImage = styled.img`
    width: 150px;
    height: 150px;
`;

const CharacterName = styled.div`
    font-size: 20px;
    flex-direction: row;
    display:flex;
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
margin : 15px 0;
    width:100%;
    height:100%;
`;

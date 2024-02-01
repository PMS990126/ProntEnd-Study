import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import loading from '../picture/주황버섯점프.gif';
import bgImg from '../picture/별삼심.png';

export default function CharacterPage() {
    let currentPath = window.location.pathname;
    let parts = currentPath.split('/');
    let ocid = parts[2]; //URL의 파리미터에서 ocid(식별자)를 가져옴
    const [characterData, setCharacterData] = useState(null); //캐릭터의 데이터를 저장하는 상태
    const [popularityData, setPopularityData] = useState(null); //캐릭터의 인기도를 저장하는 상태
    const [cashData, setCashData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 나타내는 상태 변수

    const today = new Date();
    const yesterday = new Date(today.getTime());

    yesterday.setDate(yesterday.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = ('0' + (yesterday.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
    const date = ('0' + yesterday.getDate()).slice(-2); // 날짜를 2자리로 만듭니다.
    const usingday = `${year}-${month}-${date}`;

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

    const fetchCharacterCashitemEquipmentData = (ocid) => {
        const maple_api = process.env.REACT_APP_NEXON_OPEN_API;
        fetch(`https://open.api.nexon.com/maplestory/v1/character/cashitem-equipment?ocid=${ocid}&date=${usingday}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-nxopen-api-key': maple_api,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCashData(data.cash_item_equipment_preset_1); //불러온 데이터를 상태에 저장
                setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
            })
            .catch((error) => console.error('Error:', error));
    };

    if (isLoading || !characterData || !popularityData || !cashData) {
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
                {cashData.map((item, index) => (
                    <div key={index}>
                        <span>
                            {item.cash_item_equipment_part} : {item.cash_item_name}
                        </span>
                        {/* <img src={item.cash_item_icon} alt={item.cash_item_name} /> */}
                    </div>
                ))}
            </CashItemContainer>

            <CharacterImageContainer>
                <CharacterImage src={characterData.character_image} alt="ct" />
                <div>조회 기준일 : {usingday}</div>
            </CharacterImageContainer>

            <CharacterInfoContainer>
                <CharacterName>
                    {characterData.character_name} | {characterData.world_name}
                </CharacterName>
                <CharacterDetail>
                    Lv: {characterData.character_level} | {characterData.character_class} | 인기도 {popularityData.popularity} | {characterData.character_guild_name}
                </CharacterDetail>
                <CharacterDetail>
                    <ResetBt
                        onClick={() => {
                            fetchCharacterData(ocid);
                            fetchCharacterPopularityData(ocid);
                            fetchCharacterCashitemEquipmentData(ocid);
                        }}
                    >
                        정보 갱신
                    </ResetBt>
                </CharacterDetail>
            </CharacterInfoContainer>
        </CharacterContainer>
    );
}

const CharacterContainer = styled.div`
    margin: 0;
    padding: 80px 0px 40px 30%;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    background: url(${bgImg});
    background-size: cover;
    backgroun-position: top center;
    color: white;
`;

const CharacterInfoContainer = styled.div`
    flex-dirction: column;
`;

const CharacterImageContainer = styled.div`
    align-items: center;
    margin: 0px 20px;
    flex-direction: column;
`;

const CashItemContainer = styled.div`
    padding: 8px;
    display: block;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(55, 55, 55, 0.7);
    color: white;
    padding: 5px;
    width: 130px;
    border-radius: 10px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 200%;
`;

const CharacterImage = styled.img`
    width: 150px;
    height: 150px;
`;

const CharacterName = styled.div`
    font-size: 20px;
    flex-direction: row;
    display: flex;
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
    margin: 20px 0;
    width: 100%;
`;
const ResetBt = styled.button`
    margin: 10px 0;
    display: inline-flex;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 40px;
    font-size: 1rem;
    background: #56c288;
    &:hover {
        background: #87dbae;
    }
`;

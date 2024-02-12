import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import loading from '../picture/주황버섯점프.gif';
import bgImg from '../picture/별삼심.png';
import Arcane from '../picture/World/Arcane.png';
import Aurora from '../picture/World/Aurora.png';
import Bera from '../picture/World/Bera.png';
import Croa from '../picture/World/Croa.png';
import Elysium from '../picture/World/Elysium.png';
import Enosis from '../picture/World/Enosis.png';
import Luna from '../picture/World/Luna.png';
import Nova from '../picture/World/Nova.png';
import Reboot from '../picture/World/Reboot.png';
import Red from '../picture/World/Red.png';
import Scania from '../picture/World/Scania.png';
import Union from '../picture/World/Union.png';
import Zenith from '../picture/World/Zenith.png';
import StatEquip from './StatEquip';
import Union_Artifact from './Union';
import SkillSymbol from './SkillSymbol';
import MainSub from './MainSub';

const worldMark = {
    아케인: Arcane,
    오로라: Aurora,
    베라: Bera,
    크로아: Croa,
    엘리시움: Elysium,
    이노시스: Enosis,
    루나: Luna,
    노바: Nova,
    리부트: Reboot,
    레드: Red,
    스카니아: Scania,
    유니온: Union,
    제니스: Zenith,
};
export default function CharacterPage() {
    const maple_api = process.env.REACT_APP_NEXON_OPEN_API;

    let currentPath = window.location.pathname;
    let parts = currentPath.split('/');
    let ocid = parts[2]; //URL의 파리미터에서 ocid(식별자)를 가져옴
    const [characterData, setCharacterData] = useState(null); //캐릭터의 데이터를 저장하는 상태
    const [popularityData, setPopularityData] = useState(null); //캐릭터의 인기도를 저장하는 상태
    const [cashData, setCashData] = useState(null);
    const [worldName, setWorldName] = useState(null);
    const [guildName, setGuildName] = useState(null);
    const [guildOcid, setGuildOcid] = useState(null);

    const [cashCap, setCashCap] = useState(null); // 캐릭터 캐시 모자
    const [cashTop, setCashTop] = useState(null); // 캐릭터 캐시 상의
    const [cashBottom, setCashBottom] = useState(null); // 캐릭터 캐시 하의
    const [cashShoes, setCashShoes] = useState(null); // 캐릭터 캐시 신발
    const [cashWeapon, setCashWeapon] = useState(null); // 캐릭터 캐시 무기

    const [characterHair, setCharacterHair] = useState(null); //캐릭터 헤어
    const [characterFace, setCharacterFace] = useState(null); //캐릭터 성형

    const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 나타내는 상태 변수

    const today = new Date();
    const yesterday = new Date(today.getTime());
    yesterday.setDate(yesterday.getDate() - 2);
    const year = yesterday.getFullYear();
    const month = ('0' + (yesterday.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
    const date = ('0' + yesterday.getDate()).slice(-2); // 날짜를 2자리로 만듭니다.
    const usingday = `${year}-${month}-${date}`;

    const [activeTab, setActiveTab] = useState('statEquip');

    const renderInformationContainer = () => {
        switch (activeTab) {
            case 'statEquip':
                return <StatEquip />;
            case 'union':
                return <Union_Artifact />;
            case 'skillSymbol':
                return <SkillSymbol />;
            case 'mainSub':
                return <MainSub />;
            default:
                return <StatEquip />;
        }
    };

    useEffect(() => {
        fetchCharacterData(ocid); //식별자를 이용해 캐릭터 데이터 불러오기
        fetchCharacterPopularityData(ocid); //식별자를 이용해 캐릭터 인기도 불러오기
        fetchCharacterCashitemEquipmentData(ocid);
        fetchCharacterBeautyData(ocid);
    }, [ocid]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const fetchCharacterData = (ocid) => {
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

                data.cash_item_equipment_base.forEach((item) => {
                    switch (item.cash_item_equipment_slot) {
                        case '모자':
                            setCashCap(item.cash_item_name);
                            break;
                        case '상의':
                            setCashTop(item.cash_item_name);
                            if (item.cash_item_equipment_part === '한벌옷') {
                                setCashBottom('-');
                            }
                            break;
                        case '하의':
                            setCashBottom(item.cash_item_name);
                            break;
                        case '신발':
                            setCashShoes(item.cash_item_name);
                            break;
                        case '무기':
                            setCashWeapon(item.cash_item_name);
                            break;
                        default:
                            break;
                    }
                });
            })
            .catch((error) => console.error('Error:', error));
    };

    const fetchCharacterBeautyData = (ocid) => {
        fetch(`https://open.api.nexon.com/maplestory/v1/character/beauty-equipment?ocid=${ocid}&date=${usingday}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-nxopen-api-key': maple_api,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPopularityData(data); // 불러온 데이터를 상태에 저장
                setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정

                const {
                    character_hair: { hair_name },
                    character_face: { face_name },
                } = data;
                setCharacterHair(hair_name);
                setCharacterFace(face_name);
            })
            .catch((error) => console.error('Error:', error));
    };

    if (isLoading || !characterData || !popularityData || !cashData) {
        return (
            <TitleText>
                <LoadingImg src={loading} alt="loading" />
                Loading...{usingday}
            </TitleText>
        ); // 로딩 중일 때는 "Loading..." 메시지를 표시
    }

    return (
        <PageContainer>
            <BgImgContainer>
                <CharacterContainer>
                    <CashItemContainer>
                        <div>모자 : {cashCap}</div>
                        <div>헤어 : {characterHair}</div>
                        <div>성형 : {characterFace}</div>
                        <div>상의 : {cashTop}</div>
                        <div>하의 : {cashBottom}</div>
                        <div>신발 : {cashShoes}</div>
                        <div>무기 : {cashWeapon}</div>
                    </CashItemContainer>
                    <CharacterImageContainer>
                        <CharacterImage src={characterData.character_image} alt="ct" />
                        <div>조회 기준일 : {usingday}</div>
                    </CharacterImageContainer>
                    <CharacterInfoContainer>
                        <CharacterName>
                            {characterData.character_name} | <WorldImg worldName={characterData.world_name}></WorldImg>
                            {characterData.world_name}
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
            </BgImgContainer>
            <ImformationContainer>
                <TabMenuBar>
                    <TabMenuDiv tabIndex="0" role="button" onClick={() => setActiveTab('statEquip')}>
                        스탯/장비
                    </TabMenuDiv>
                    <TabMenuDiv tabIndex="0" role="button" onClick={() => setActiveTab('union')}>
                        유니온
                    </TabMenuDiv>
                    <TabMenuDiv tabIndex="0" role="button" onClick={() => setActiveTab('skillSymbol')}>
                        스킬 및 심볼
                    </TabMenuDiv>
                    <TabMenuDiv tabIndex="0" role="button" onClick={() => setActiveTab('mainSub')}>
                        본캐/부캐
                    </TabMenuDiv>
                </TabMenuBar>
                <UnderContainer>{renderInformationContainer()}</UnderContainer>
            </ImformationContainer>
        </PageContainer>
    );
}
const PageContainer = styled.div`
    background-color: rgba(33, 34, 39);
    flex-direction: column;
`;

const BgImgContainer = styled.div`
    background: url(${bgImg});
    background-size: cover;
    height: 100%;
`;

const CharacterContainer = styled.div`
    margin-left: 22%;
    margin-right: 22%;
    padding: 80px 0 40px 20px;
    display: flex;
    color: white;
    max-width: 100%;
    height: 100%;
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
    width: 140px;
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
    align-items: center;
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

const WorldImg = styled.div`
    background-image: url(${(probs) => worldMark[probs.worldName]});
    background-size: cover;
    width: 20px;
    height: 20px;
    margin-right: 5px;
`;

const ImformationContainer = styled.div`
    background-color: #f8f9fa;
    padding: 20px;
    flex-grow: 1;
    height: 100%;
`;

const TabMenuBar = styled.div`
    background-color: white;
    display: flex;
    justify-content: left;
    align-items: center;
    border: solid 1px #ced4da;
    margin-bottom: 20px;
    border-radius: 15px;
    margin-left: 22%;
    margin-right: 22%;
`;

const TabMenuDiv = styled.div`
    background-color: white;
    border: none;
    border-right: solid 1px #ced4da;
    width: 100px;
    height: 40px;
    margin-left: 15px;
    padding-right: 15px;
    justify-content: left;
    cursor: pointer;
    font-family: 'Cafe24SsurroundAir';
    &:hover {
        background: #87dbae;
    }
`;

const UnderContainer = styled.div`
    border-right: solid 1px #ced4da;
    background-color: white;
    border-radius: 15px;
    margin-left: 22%;
    margin-right: 22%;
    padding: 20px;
`;

import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import loading from '../picture/주황버섯점프.gif';
import bgImg from '../picture/파르템.png';
import Arcane from '../picture/Arcane.png';
import Aurora from '../picture/Aurora.png';
import Bera from '../picture/Bera.png';
import Croa from '../picture/Croa.png';
import Elysium from '../picture/Elysium.png';
import Enosis from '../picture/Enosis.png';
import Luna from '../picture/Luna.png';
import Nova from '../picture/Nova.png';
import Reboot from '../picture/Reboot.png';
import Red from '../picture/Red.png';
import Scania from '../picture/Scania.png';
import Union from '../picture/Union.png';
import Zenith from '../picture/Zenith.png';
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
    const [characterName, setCharacterName] = useState(null); //캐릭터 명
    const [worldName, setWorldName] = useState(null); //월드 이름
    const [characterGender, setCharacterGender] = useState(null); //캐릭터 성별
    const [characterClass, setCharacterClass] = useState(null); //캐릭터 직업
    const [characterLevel, setCharacterLevel] = useState(null); //캐릭터 레벨
    const [characterExp, setCharacterExp] = useState(null); //캐릭터 경험치 퍼센트
    const [characterGuild, setCharacterGuild] = useState(null); //캐릭터 소속 길드
    const [characterImage, setCharacterImage] = useState(null); //캐릭터 외형 이미지

    const [characterHair, setCharacterHair] = useState(null); //캐릭터 헤어
    const [characterFace, setCharacterFace] = useState(null); //캐릭터 성형

    const [cashCap, setCashCap] = useState(null); // 캐릭터 캐시 모자
    const [cashTop, setCashTop] = useState(null); // 캐릭터 캐시 상의
    const [cashBottom, setCashBottom] = useState(null); // 캐릭터 캐시 하의
    const [cashShoes, setCashShoes] = useState(null); // 캐릭터 캐시 신발
    const [cashWeapon, setCashWeapon] = useState(null); // 캐릭터 캐시 무기

    const [popularityData, setPopularityData] = useState(null); //캐릭터 인기도

    const [guildMark, setGuildMark] = useState(''); // 캐릭터 일반 길드 마크 정보
    const [guildCustomMark, setGuildCustomMark] = useState(''); // 캐릭터 커스텀 길드 마크 정보

    const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 나타내는 상태 변수

    const [activeTab, setActiveTab] = useState('statEquip');

    const today = new Date();
    const yesterday = new Date(today.getTime());
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = ('0' + (yesterday.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
    const date = ('0' + yesterday.getDate()).slice(-2); // 날짜를 2자리로 만듭니다.
    const usingday = `${year}-${month}-${date}`;

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
        fetchUserData();
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const fetchUserData = async () => {
        try {
            // 캐릭터 기본 정보 조회 api
            const getCharacterBasic = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}&date=${usingday}`, {
                headers: { 'x-nxopen-api-key': maple_api },
            });
            const { character_name, world_name, character_gender, character_class, character_level, character_exp_rate, character_guild_name, character_image } = getCharacterBasic.data;
            setCharacterName(character_name);
            setWorldName(world_name);
            setCharacterGender(character_gender);
            setCharacterClass(character_class);
            setCharacterLevel(character_level);
            setCharacterExp(character_exp_rate);
            setCharacterGuild(character_guild_name);
            setCharacterImage(character_image);

            // 캐릭터 인기도 정보 조회 api
            const getCharacterPopularity = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/popularity?ocid=${ocid}&date=${usingday}`, {
                headers: { 'x-nxopen-api-key': maple_api },
            });
            const { popularity } = getCharacterPopularity.data;
            setPopularityData(popularity);

            //캐릭터 장착 헤어, 성형, 피부, 정보 조회 api
            const getCharacterBeaty = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/beauty-equipment?ocid=${ocid}&date=${usingday}`, {
                headers: { 'x-nxopen-api-key': maple_api },
            });
            const {
                character_hair: { hair_name },
                character_face: { face_name },
            } = getCharacterBeaty.data;
            setCharacterHair(hair_name);
            setCharacterFace(face_name);

            // 캐릭터 캐시 장비 조회 api
            const getCharacterCashitemEquipment = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/cashitem-equipment?ocid=${ocid}&date=${usingday}`, {
                headers: { 'x-nxopen-api-key': maple_api },
            });
            const { cash_item_equipment_base } = getCharacterCashitemEquipment.data;
            cash_item_equipment_base.forEach((item) => {
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

            //길드 식별자 정보 조회
            const getOguild_id = await axios.get(`https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${character_guild_name}&world_name=${world_name}`, {
                headers: { 'x-nxopen-api-key': maple_api },
            });
            const Oguild_id = getOguild_id.data.oguild_id;

            // 길드 마크 정보 가져오기
            const getGuildMark = await axios.get(`https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=${Oguild_id}&date=${usingday}`, {
                headers: { 'x-nxopen-api-key': maple_api },
            });
            const { guild_mark_custom, guild_mark } = getGuildMark.data;
            const guildMarkIcon = `data:image/png;base64,${guild_mark_custom}`;
            setGuildMark(guild_mark);
            setGuildCustomMark(guildMarkIcon);
        } catch (error) {
            console.log(error.response);
        }
    };

    if (isLoading) {
        return (
            <TitleText>
                <LoadingImg src={loading} alt="loading" />
                Loading...{usingday}
            </TitleText>
        ); // 로딩 중일 때는 "Loading..." 메시지를 표시
    }

    return (
        <PageContainer>
            <CharacterContainer>
                <CashItemContainer>
                    <CodyBox>
                        <div>모자 : {cashCap}</div>
                        <div>헤어 : {characterHair}</div>
                        <div>성형 : {characterFace}</div>
                        <div>상의 : {cashTop}</div>
                        <div>하의 : {cashBottom}</div>
                        <div>신발 : {cashShoes}</div>
                        <div>무기 : {cashWeapon}</div>
                    </CodyBox>
                    <MoreCashItemContainer to="">코디 상세 정보 Link</MoreCashItemContainer>
                </CashItemContainer>
                <CharacterImageContainer>
                    <CharacterImage imageUrl={characterImage} alt="ct" />
                    <LastContainer>조회 기준일 : {usingday}</LastContainer>
                </CharacterImageContainer>

                <CharacterInfoContainer>
                    <CharacterName>
                        {characterName} | <WorldImg worldName={worldName}></WorldImg>
                        {worldName}
                    </CharacterName>
                    <CharacterDetail>
                        Lv: {characterLevel} | {Number(characterExp).toFixed(2)}% | 인기도 {popularityData} |&nbsp; <GuildMark guildCustomIcon={guildCustomMark} guildIcon={guildMark}></GuildMark>
                        &nbsp;
                        {characterGuild}
                    </CharacterDetail>
                    <CharacterDetail>
                        {/* <ResetBt
                        onClick={() => {
                            fetchCharacterData(ocid);
                            fetchCharacterPopularityData(ocid);
                            fetchCharacterCashitemEquipmentData(ocid);
                        }}
                    >
                        정보 갱신
                    </ResetBt> */}
                    </CharacterDetail>
                </CharacterInfoContainer>
            </CharacterContainer>
            <ImformationContainer>
                <TabMenuBar>
                    <TabMenuBt onClick={() => setActiveTab('statEquip')}>스탯/장비</TabMenuBt>
                    <TabMenuBt onClick={() => setActiveTab('union')}>유니온</TabMenuBt>
                    <TabMenuBt onClick={() => setActiveTab('skillSymbol')}>스킬 및 심볼</TabMenuBt>
                    <TabMenuBt onClick={() => setActiveTab('mainSub')}>본캐/부캐</TabMenuBt>
                </TabMenuBar>
                <UnderContainer>{renderInformationContainer()}</UnderContainer>
            </ImformationContainer>
        </PageContainer>
    );
}
const PageContainer = styled.div`
    background-color: rgba(33, 34, 39);
    flex-direction: column;
    font-family: 'Cafe24SsurroundAir';
`;

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
    display: flex;
    flex-direction: column;
    margin-left: 2vh;
`;
const LastContainer = styled.div`
    color: white;
    font-size: 15px;
    text-align: center;
`;

const CashItemContainer = styled.div`
    display: block;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(55, 55, 55, 0.7);
    color: white;
    padding: 5px;
    width: 5.8vw;
    border-radius: 10px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 200%;
`;
const CodyBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 10px 5px 10px;
    height: 100%;
`;
const MoreCashItemContainer = styled.div`
    display: flex;
    backgroun-color: #1856f2;
    color: white;
    font-size: 15px;
    font-family: 'Maplestory Bold';
    justify-content: center;
    align-items: center;
`;

const CharacterImage = styled.div`
    background-image: url(${(props) => props.imageUrl});
    background-size: cover;
    height: 100%;
`;

const CharacterName = styled.div`
    font-size: 25px;
    flex-direction: row;
    display: flex;
    align-items: center;
`;

const WorldImg = styled.div`
    background-image: url(${(probs) => worldMark[probs.worldName]});
    background-size: cover;
    width: 20px;
    height: 20px;
    margin-right: 5px;
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
    font-size: 20px;
    margin: 20px 0;
    width: 100%;
    display: flex;
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

const TabMenuBt = styled.button`
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
`;
const UnderContainer = styled.div`
    border-right: solid 1px #ced4da;
    background-color: white;
    border-radius: 15px;
    margin-left: 22%;
    margin-right: 22%;
    padding: 20px;
`;

const GuildMark = styled.div`
    // 상세정보 컨테이너 내부의 길드 마크
    background-image: url(${(props) => props.guildIcon || props.guildCustomIcon});
    background-size: cover;
    width: 20px;
    height: 20px;
    display: flex;
`;

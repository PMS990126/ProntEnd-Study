import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation } from "react-router-dom"
import axios from "axios";
import backgroundImage from "../picture/perion.png"
import styled from 'styled-components';
import Stats from './Stats';
import Union from './Union';
import Skills from './Skills';
import MainSub from './MainSub';


export default function SearchPage() {

    const NEXON_OPEN_API_KEY = process.env.REACT_APP_NEXON_OPEN_API_KEY; // 넥슨 오픈 Api key

    const navigate = useNavigate(); // 페이지 이동 훅
    const location = useLocation(); // URL 정보 객체 반환 훅

    const queryParams = new URLSearchParams(location.search);

    const charName = queryParams.get("input"); // 검색한 캐릭터 이름 가져오기
    const searchDate = queryParams.get("date"); // 검색한 날짜&시간 가져오기

    const [charHair, setCharHair] = useState(""); // 캐릭터 헤어 정보
    const [charFace, setCharFace] = useState(""); // 캐릭터 성형 정보

    const [cashCap, setCashCap] = useState(""); // 캐릭터 캐시 모자 정보
    const [cashTop, setCashTop] = useState(""); // 캐릭터 캐시 상의 정보
    const [cashBottom, setCashBottom] = useState(""); // 캐릭터 캐시 하의 정보
    const [cashShoes, setCashShoes] = useState(""); // 캐릭터 캐시 신발 정보
    const [cashWeapon, setCashWeapon] = useState(""); // 캐릭터 캐시 무기 정보

    const [charNick, setCharNick] = useState(""); // 캐릭터 닉네임 정보
    const [charClass, setCharClass] = useState(""); // 캐릭터 직업 정보
    const [charLevel, setCharLevel] = useState(0); // 캐릭터 레벨 정보
    const [charExp, setCharExp] = useState(0); // 캐릭터 경험치 정보
    const [charImage, setCharImage] = useState(""); // 캐릭터 이미지 정보
    const [charWorldName, setCharWorldName] = useState(""); // 캐릭터 월드 정보
    const [charGuildName, setCharGuildName] = useState(""); // 캐릭터 길드 정보

    const [charPop, setCharPop] = useState(0); // 캐릭터 인기도 정보

    const [guildMark, setGuildMark] = useState(""); // 캐릭터 일반 길드 마크 정보
    const [guildCustomMark, setGuildCustomMark] = useState(""); // 캐릭터 커스텀 길드 마크 정보

    const [activeTab, setActiveTab] = useState('Stats');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
      };

    //const renderTabContent = () => {
    //    switch (ActiveTab) {
    //      case 'Stats':
    //        return <Stats />;
    //      case 'Union':
    //        return <Union />;
    //      case 'Skills':
    //        return <Skills />;
    //      case 'MainSub':
    //        return <MainSub />;
    //      default:
    //        return <Stats />;
    //    }
    //  };


    
    const fetchUserData = async () => {
        try {
            const getOcid = await axios.get(`https://open.api.nexon.com/maplestory/v1/id?character_name=${charName}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            const ocid = getOcid.data.ocid;

            const getCashItemInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/cashitem-equipment?ocid=${ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            
            const {cash_item_equipment_base} = getCashItemInfo.data;
            cash_item_equipment_base.forEach(item => {
                switch(item.cash_item_equipment_slot) {
                    case '모자':
                    setCashCap(item.cash_item_name);
                    break;
                    case '상의':
                    setCashTop(item.cash_item_name);
                    if(item.cash_item_equipment_part === '한벌옷') {setCashBottom('-');}
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

            const getBeautyInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/beauty-equipment?ocid=${ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});

            const {character_hair : {hair_name}, character_face : {face_name}} = getBeautyInfo.data;
            setCharHair(hair_name);
            setCharFace(face_name);

            const getCharBasicInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});

            const {character_name, world_name, character_class, character_level, character_exp_rate, character_guild_name, character_image} = getCharBasicInfo.data;
            setCharNick(character_name);
            setCharWorldName(world_name);
            setCharClass(character_class);
            setCharLevel(character_level);
            setCharExp(character_exp_rate);
            setCharGuildName(character_guild_name);
            setCharImage(character_image);

            const getCharPopInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/popularity?ocid=${ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});

            const{popularity} = getCharPopInfo.data;
            setCharPop(popularity);

            const getOguild_id = await axios.get(`https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${character_guild_name}&world_name=${world_name}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            
            const Oguild_id = getOguild_id.data.oguild.id;

            const getGuildMark = await axios.get(`https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=${Oguild_id}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            const {guild_mark_custom, guild_mark} = getGuildMark.data;
            const guildMarkIcon = `data:image/png;base64,${guild_mark_custom}`;
            setGuildMark(guild_mark);
            setGuildCustomMark(guildMarkIcon);


            console.log(charName);


        } catch (error) {console.log(error.response)}
    };
    


    
    useEffect (() => {
        const charName = queryParams.get("input");

        if(charName) {
            fetchUserData();
        }
    }, [charName]);


    return(
        <Container>
            <MainContainer>
                <CashItemContainer>
                    <ItemContainer>모자 : {cashCap}</ItemContainer>
                    <ItemContainer>헤어 : {charHair}</ItemContainer>
                    <ItemContainer>성형 : {charFace}</ItemContainer>
                    <ItemContainer>상의 : {cashTop}</ItemContainer>
                    <ItemContainer>하의 : {cashBottom}</ItemContainer>
                    <ItemContainer>신발 : {cashShoes}</ItemContainer>
                    <ItemContainer>무기 : {cashWeapon}</ItemContainer>
                </CashItemContainer>

                <ImageContainer>
                    <Image src = {charImage}></Image>
                    <LastDay>마지막 접속일:1일 전</LastDay>
                </ImageContainer>

                <UserContainer>
                    <NickWorldContainer>
                        {charNick} | {charWorldName}
                    </NickWorldContainer>

                    <InfoContainer>
                        Lv.{charLevel} {charExp}% | {charClass} | 인기도 {Number(charPop).toLocaleString()} | {charGuildName}
                        <ResetButton onClick = {fetchUserData}>정보 갱신</ResetButton>
                    </InfoContainer>
                </UserContainer>
                
            </MainContainer>
            <TabContainer>
                <TabButton active={activeTab === 'Stats'} onClick = {() => handleTabClick('Stats')}>스탯장비</TabButton>
                <TabButton active={activeTab === 'Stats'} onClick = {() => handleTabClick('Union')}>유니온</TabButton>
                <TabButton active={activeTab === 'Stats'} onClick = {() => handleTabClick('Skills')}>스킬 및 심볼</TabButton>
                <TabButton active={activeTab === 'Stats'} onClick = {() => handleTabClick('MainSub')}>본캐/부캐</TabButton>
            </TabContainer>

            <UnderContainer>
                {activeTab === 'Stats' && <Stats />}
                {activeTab === 'Union' && <Union />}
                {activeTab === 'Skills' && <Skills />}
                {activeTab === 'MainSub' && <MainSub />}
            </UnderContainer>
            
           
            
        </Container>
        

        
    )
    
};


const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const MainContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 40vh;
    margin: auto;
    position: relative;
    background: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
`;

const CashItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    width: 13vw;
    background-color: skyblue;
    height: 30vh;
    margin-left: 300px;
    margin-top: 15px;
    margin-bottom: 10px;
    white-space: nowrap;

`;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 2px;
    margin-top: 6px;
    font-size: 17px;
    font-family: 'NEXONLv1GothicLight';
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 20vw;
    height: 30vh;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
`;

const Image = styled.img`
    width: 150px;
    height: 150px;
    position: relative;
    left: 20%;
`;

const LastDay = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
`;

const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 100px;
    justify-content: center;
    font-family: 'Maplestory Light';
`;

const NickWorldContainer = styled.div`
    font-size: 20px;
`;

const InfoContainer = styled.div`
    font-size: 15px;
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
`;

const ResetButton = styled.button`
    display: flex;
    font-family: Maplestory Bold;
    font-size: 30px;
    flex-direction: column;
    width: 150px;
    height: 50px;
    margin-top: 20px;
    margin-left: 50px;
    background: green;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    align-items: center;
    justify-content: center;
`;

const TabContainer = styled.div`
    justify-content: center;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  width: 150px;
  height: 50px;
  margin: 10px;
  background-color: ${props => (props.active ? '#333' : '#ccc')};
  color: ${props => (props.active ? '#fff' : '#333')};
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  border: none;
  font-family: Maplestory Bold;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
`;

const UnderContainer = styled.div`
    width: 80vw;
    margin: auto;
    margin-top: 2.5vh;
`;

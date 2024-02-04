import React, { useState, useEffect } from 'react';
import {NavLink, useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import styled from 'styled-components';


export default function SearchPage() {

    const NEXON_OPEN_API_KEY = process.env.REACT_APP_NEXON_OPEN_API_KEY; // 넥슨 오픈 Api key

    const navigate = useNavigate(); // 페이지 이동 훅
    const location = useLocation(); // URL 정보 객체 반환 훅

    const [searchQuery, setSearchQuery] = useState(""); // 현재 페이지에서의 사용자 입렵값

    const queryParams = new URLSearchParams(location.search);

    const charName = queryParams.get("searchQuery"); // 검색한 캐릭터 이름 가져오기
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

            const getBeautyInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/beauty-equipment?ocid=${searchQuery}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});

            const {character_hair : {hair_name}, character_face : {face_name}} = getBeautyInfo.data;
            setCharHair(hair_name);
            setCharFace(face_name);

            const getCharBasicInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${searchQuery}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});

            const {character_name, world_name, character_class, character_class_level, character_exp_rate, character_guild_name, character_image} = getCharBasicInfo.data;
            setCharNick(character_name);
            setCharWorldName(world_name);
            setCharClass(character_class);
            setCharLevel(character_class_level);
            setCharExp(character_exp_rate);
            setCharGuildName(character_guild_name);
            setCharImage(character_image);

            const getCharPopInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/popularity?ocid=${searchQuery}&date=${searchDate}`, {
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


        } catch (error) {console.log(error.response)}
    };


    
    useEffect (() => {
        const charName = queryParams.get("searchQuery");

        if(charName) {
            fetchUserData();
        }
    }, [charName]);


    return(
        <Container>
            <CashItemContainer>
                <ItemContainer>모자 : {cashCap}</ItemContainer>
                <ItemContainer>상의 : {cashTop}</ItemContainer>
                <ItemContainer>하의 : {cashBottom}</ItemContainer>
                <ItemContainer>신발 : {cashShoes}</ItemContainer>
                <ItemContainer>무기 : {cashWeapon}</ItemContainer>
            </CashItemContainer>

            <ImageContainer>
                <Image src = {charImage} alt = "캐릭터" />
                <LastDay>마지막 접속일:1일전</LastDay>
            </ImageContainer>

            <NickWorldContainer>
                {charName} | {charWorldName}
            </NickWorldContainer>

            <InfoContainer>
                Lv.{charLevel} {charExp} | {charClass} | 인기도 {charPop.toLocaleString} | {charGuildName}
            </InfoContainer>

            <ResetButton onClick = {fetchUserData}>정보 갱신</ResetButton>
        </Container>
    )
    
};

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 50vh;
    margin: auto;
    margin-top: 10px;
`;

const CashItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vw;
    height: 40vh;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ImageContainer = styled.div`
    display: flex;
    width: 30vw;
    height: 40vh;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Image = styled.img`
    background-size: cover;  
`;

const LastDay = styled.div`
    color: white;
`

const NickWorldContainer = styled.div`
    font-size: 20px;
`;

const InfoContainer = styled.div`
    font-size: 15px;
    display: flex;
    flex-direction: column;
    margin: auto;
`;

const ResetButton = styled.button`
    flex-direction: column;
    background: green;
    color: white;
`





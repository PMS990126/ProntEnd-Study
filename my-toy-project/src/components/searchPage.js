import React, { useState, useEffect } from 'react';
import {NavLink, useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Arcane from "../images/Arcane.png";
import Aurora from "../images/Aurora.png";
import Bera from "../images/Bera.png";
import Croa from "../images/Croa.png";
import Elysium from "../images/Elysium.png";
import Enosis from "../images/Enosis.png";
import Luna from "../images/Luna.png";
import Nova from "../images/Nova.png";
import Reboot from "../images/Reboot.png";
import Red from "../images/Red.png";
import Scania from "../images/Scania.png";
import Union from "../images/Union.png";
import Zenith from "../images/Zenith.png";
import geulja from "../images/geulja.png";
import myeonghun from "../images/myeonghun.png";
import pangE from "../images/pangE.png";
import suho from "../images/suho.png";
import wongi from "../images/wongi.png";
import Stats_Equipment from "./Stats_Equipment.js";
import Union_Artifact from "./Union_Artifact.js";
import Skill_Symbol from "./Skill_Symbol.js";
import MainChar_SubChar from "./MainChar_SubChar.js";

const worldMark = {
    "아케인" : Arcane,
    "오로라" : Aurora,
    "베라" : Bera,
    "크로아" : Croa,
    "엘리시움" : Elysium,
    "이노시스" : Enosis,
    "루나" : Luna,
    "노바" : Nova,
    "리부트" : Reboot,
    "레드" : Red,
    "스카니아" : Scania,
    "유니온" : Union,
    "제니스" : Zenith
};

export default function SearchPage() {

    const NEXON_OPEN_API_KEY = process.env.REACT_APP_NEXON_OPEN_API_KEY; // 넥슨 오픈 Api key

    const navigate = useNavigate(); // 페이지 이동 훅
    const location = useLocation(); // URL 정보 객체 반환 훅

    const [userInput, setUserInput] = useState(""); // 현재 페이지에서의 사용자 입력값
    const [activeTab, setActiveTab] = useState("Stats_Equipment"); // 렌더링할 컴포넌트를 결정하는 상태 + 초기값은 스탯&장비

    const queryParams = new URLSearchParams(location.search);

    const bannerImg = [geulja, myeonghun, pangE, suho, wongi]; // 배너 이미지 배열

    const [ocid, setOcid] = useState(""); // 캐릭터 ocid 값 

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
    
    const fetchUserData = async () => { 
        try {
            // 캐릭터 식별자 ocid 가져오기
            const getOcid = await axios.get(`https://open.api.nexon.com/maplestory/v1/id?character_name=${charName}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            const Ocid = getOcid.data.ocid;
            setOcid(getOcid.data.ocid);

            // 캐릭터 헤어&성형 정보 가져오기
            const getBeautyInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/beauty-equipment?ocid=${Ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            const {character_hair: {hair_name}, character_face: {face_name}} = getBeautyInfo.data;
            setCharHair(hair_name);
            setCharFace(face_name);

            // 캐릭터 캐시 장비 정보 가져오기
            const getCashItemInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/cashitem-equipment?ocid=${Ocid}&date=${searchDate}`, {
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

            // 캐릭터 기본 정보 가져오기
            const getCharBasicInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${Ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            const {character_name, world_name, character_class, character_level, character_exp_rate, character_guild_name, character_image} = getCharBasicInfo.data;
            setCharNick(character_name);
            setCharClass(character_class);
            setCharLevel(character_level);
            setCharExp(character_exp_rate);
            setCharImage(character_image);
            setCharWorldName(world_name);
            setCharGuildName(character_guild_name);

            // 캐릭터 인기도 정보 가져오기
            const getCharPopInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/popularity?ocid=${Ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            const {popularity} = getCharPopInfo.data;
            setCharPop(popularity);

            // 길드 식별자 oguild_id 가져오기
            const getOguild_id = await axios.get(`https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${character_guild_name}&world_name=${world_name}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            const Oguild_id = getOguild_id.data.oguild_id;

            // 길드 마크 정보 가져오기
            const getGuildMark = await axios.get(`https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=${Oguild_id}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            const {guild_mark_custom, guild_mark} = getGuildMark.data;
            const guildMarkIcon = `data:image/png;base64,${guild_mark_custom}`;
            setGuildMark(guild_mark);
            setGuildCustomMark(guildMarkIcon);
        } catch (error) {console.log(error.response);}
    };    

    const UserInputChange = (e) => { // 사용자 입력값 파라미터 변경 메서드
        setUserInput(e.target.value);
    };

    const Re_Search = (e) => { // 캐릭터 재검색 메서드
        e.preventDefault(); 
        queryParams.set('input', userInput); 
        navigate({
            pathname: location.pathname,
            search: '?' + queryParams.toString(),
        });
        fetchUserData(); 
    };

    useEffect(() => {
        const charName = queryParams.get("input");

        if (charName) {
            fetchUserData();
        }
    }, [charName]);

    return (
        <Container>
            <UserInfoBox>
                <CashItemBox>
                    <CodyBox>
                        <DetailCodyInfoBox>
                            <CodyParts>모자 &nbsp;:</CodyParts>
                            <CodyInfo>{cashCap}</CodyInfo>
                        </DetailCodyInfoBox>
                        <DetailCodyInfoBox>
                            <CodyParts>헤어 &nbsp;:</CodyParts>
                            <CodyInfo>{charHair}</CodyInfo>
                        </DetailCodyInfoBox>
                        <DetailCodyInfoBox>
                            <CodyParts>성형 &nbsp;:</CodyParts>
                            <CodyInfo>{charFace}</CodyInfo>
                        </DetailCodyInfoBox>
                        <DetailCodyInfoBox>
                            <CodyParts>상의 &nbsp;:</CodyParts>
                            <CodyInfo>{cashTop}</CodyInfo>
                        </DetailCodyInfoBox>
                        <DetailCodyInfoBox>
                            <CodyParts>하의 &nbsp;:</CodyParts>
                            <CodyInfo>{cashBottom}</CodyInfo>
                        </DetailCodyInfoBox>
                        <DetailCodyInfoBox>
                            <CodyParts>신발 &nbsp;:</CodyParts>
                            <CodyInfo>{cashShoes}</CodyInfo>
                        </DetailCodyInfoBox>
                        <DetailCodyInfoBox>
                            <CodyParts>무기 &nbsp;:</CodyParts>
                            <CodyInfo>{cashWeapon}</CodyInfo>
                        </DetailCodyInfoBox>
                    </CodyBox>
                    <DetailCodyLink>
                        <NavLink to = "" style = {{textDecoration: 'none', color: 'white'}}>코디 상세 정보 Link</NavLink>
                    </DetailCodyLink>
                </CashItemBox>
                <CharImageBox>
                    <CharImage imageUrl = {charImage}></CharImage>
                    <LastActivityDay>마지막 활동일 : {1}일 전</LastActivityDay>
                </CharImageBox>
                <CharInfoBox>
                    <NickandWorldBox>
                        <CharNickname>{charNick}</CharNickname>
                        <WorldBox>
                            <WorldIcon worldName = {charWorldName}></WorldIcon>
                            <WorldName>{charWorldName}</WorldName>
                        </WorldBox>
                    </NickandWorldBox>
                    <CharDetailInfo>
                        <LevelandExp>Lv.{charLevel}({Number(charExp).toFixed(2)}%)</LevelandExp>
                        <Divider>I</Divider>
                        <CharClass>{charClass}</CharClass>
                        <Divider>I</Divider>
                        <CharPop>인기도 {Number(charPop).toLocaleString()}</CharPop>
                        <Divider>I</Divider>
                        <GuildBox to="">
                            <GuildMark guildCustomIcon = {guildCustomMark} guildIcon = {guildMark}></GuildMark>
                            <GuildName>{charGuildName}</GuildName>
                        </GuildBox>
                    </CharDetailInfo>
                    <RefreshButton onClick = {fetchUserData}>최신정보로 갱신하기</RefreshButton>
                    <RecentUpdate>최근 정보 갱신일 : {searchDate}</RecentUpdate>
                    <SearchBar onSubmit = {Re_Search}>
                        <InputField type="text" value = {userInput} onChange = {UserInputChange} placeholder="캐릭터 또는 길드명을 입력하세요."/>
                        <SearchButton type="submit">검색</SearchButton>
                    </SearchBar>
                </CharInfoBox>
                <BannerAd modules = {[Navigation, Pagination]} slidesPerView = {1} pagination={{ clickable: true }} navigation>
                    {bannerImg.map((image, index) => (
                        <BannerSlide key = {index}>
                            <SlideImage imageUrl = {image}/>
                        </BannerSlide>
                    ))}
                </BannerAd>         
            </UserInfoBox>
            <NaviBar>
                <NaviButton active = {activeTab === "Stats_Equipment"} onClick = {() => setActiveTab("Stats_Equipment")}>스탯 & 장비</NaviButton>
                <NaviButton active = {activeTab === "Union_Artifact"} onClick = {() => setActiveTab("Union_Artifact")}>유니온 & 아티팩트</NaviButton>
                <NaviButton active = {activeTab === "Skill_Symbol"} onClick = {() => setActiveTab("Skill_Symbol")}>스킬 & 심볼</NaviButton>
                <NaviButton active = {activeTab === "MainChar_SubChar"} onClick = {() => setActiveTab("MainChar_SubChar")}>본캐 & 부캐</NaviButton>
            </NaviBar>
            <DetailInfoContainer>
                {activeTab === "Stats_Equipment" && <Stats_Equipment ocid = {ocid}/>}
                {activeTab === "Union_Artifact" && <Union_Artifact ocid = {ocid}/>}
                {activeTab === "Skill_Symbol" && <Skill_Symbol ocid = {ocid}/>}
                {activeTab === "MainChar_SubChar" && <MainChar_SubChar ocid = {ocid}/>}
            </DetailInfoContainer>
        </Container>
    );
}

const Container = styled.div` // 검색 페이지 최상위 부모 컨테이너
    display: flex; 
    flex-direction: column;
`;

const UserInfoBox = styled.div` // 유저 정보 박스의 최상위 컨테이너
    display: flex; 
    width: 80vw;
    height: 30vh;
    background-color: #363944;
    border-radius: 10px;
    margin: auto;
    margin-top: 5vh;
`;

const CashItemBox = styled.div` // 유저 정보 박스 내부의 좌측 캐시 아이템 박스 최상위 컨테이너
    display: flex; 
    flex-direction: column;
    width: 10vw;
    height: 25vh;
    background-color: #212227;
    border-radius: 10px;
    margin-top: 2.5vh;
    margin-left: 2.5vh;
`;

const CodyBox = styled.div` // 캐시 아이템 박스 내부의 코디아이템 컨테이너
    display: flex; 
    flex-direction: column;
    padding: 10px 10px 5px 10px;
    height: 100%;
`;

const DetailCodyInfoBox = styled.div` // 코디 박스 내부의 상세코디정보 컨테이너
    display: flex;
    margin-bottom: 2.5px;
`;

const CodyParts = styled.div` // 상세코디정보 박스 내부의 코디 파츠 타이틀
    color: #5CB85C;
    font-size: 12.5px;
    font-weight: bold;
    white-space: nowrap;
`;

const CodyInfo = styled.div` // 상세코디정보 박스 내부의 코디 파츠 정보
    color: white;
    font-size: 12.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
`;

const DetailCodyLink = styled.div` // 캐시 아이템 박스 내부의 상세 코디 분석 페이지 이동 링크
    display: flex;
    background-color: #5CB85C;
    color: white;
    font-size: 15px;
    font-family: maple-font;
    justify-content: center;
    align-items: center;
    border-radius: 0px 0px 10px 10px;
    height: 6vh;
`;

const CharImageBox = styled.div` // 유저 정보 박스 내부의 캐릭터 이미지 박스 최상위 컨테이너
    display: flex; 
    flex-direction: column;
    width: 10vw;
    height: 25vh;
    margin-top: 2.5vh;
    margin-left: 2.5vh;
`;

const CharImage = styled.div` // 캐릭터 이미지 박스 내부의 캐릭터 이미지
    background-image: url(${props => props.imageUrl});
    background-size: cover;
    height: 100%;
`;

const LastActivityDay = styled.div` // 캐릭터 이미지 박스 내부의 마지막 활동일
    color: white;
    font-size: 12.5px;
    text-align: center;
`;

const CharInfoBox = styled.div` // 유저 정보 박스 내부의 캐릭터 정보 박스 최상위 컨테이너
    display: flex; 
    flex-direction: column;
    width: 30vw;
    height: 25vh;
    margin-top: 2.5vh;
    margin-left: 2.5vh;
`;

const NickandWorldBox = styled.div` // 캐릭터 정보 박스 내부의 닉네임&서버이름 컨테이너
    display: flex; 
`;

const CharNickname = styled.div` // 닉네임&서버이름 컨테이너 내부의 닉네임박스
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin-right: 1vw;
`;

const WorldBox = styled.div` // 닉네임&서버이름 컨테이너 내부의 서버 컨테이너
    display: flex;
    border: 1px solid #666A7A;
    border-radius: 25px;
    padding: 5px 10px 5px 5px;
`;

const WorldIcon = styled.div` // 서버 컨테이너 내부의 서버 마크아이콘
    background-image: url(${props => worldMark[props.worldName]});
    background-size: cover;
    width: 15px;
    height: 15px;
    margin-right: 5px;
`;

const WorldName = styled.div` // 서버 컨테이너 내부의 서버이름
    color: white;
    font-size: 10px;
    font-weight: bold;
`;

const CharDetailInfo = styled.div` // 캐릭터 정보 박스 내부의 상세정보 컨테이너
    display: flex;
    margin-top: 1vh;
`;

const Divider = styled.span`
    color: #666A7A;
    margin: 0 5px;
`;

const LevelandExp = styled.div` // 상세정보 컨테이너 내부의 캐릭터 레벨 및 경험치 퍼센트
    color: white;
    font-size: 15px;
`;

const CharClass = styled.div` // 상세정보 컨테이너 내부의 캐릭터 직업
    color: white;
    font-size: 15px;
`;

const CharPop = styled.div` // 상세정보 컨테이너 내부의 캐릭터 인기도
    color: white;
    font-size: 15px;
`;

const GuildBox = styled(NavLink)` // 상세정보 컨테이너 내부의 길드 컨테이너
    display: flex;
    text-decoration: none;
`;

const GuildMark = styled.div` // 상세정보 컨테이너 내부의 길드 마크
    background-image: url(${props => props.guildIcon || props.guildCustomIcon});
    background-size: cover;
    width: 20px;
    height: 20px;
`;

const GuildName = styled.div` // 상세정보 컨테이너 내부의 길드 이름
    color: white;
    font-size: 15px;
    margin-left: 5px;
`;

const RefreshButton = styled.button` // 캐릭터 정보 박스 내부의 새로고침 버튼
    width: 12vw;
    height: 6vh;
    margin-top: 10px;
    background-color: #007BFF;
    border-radius: 10px;
    color: white;
    font-size: 15px;
    font-family: maple-font;
    cursor: pointer;
    border: none; 
    box-shadow: none; 
    outline: none; 

    &:hover {
        background-color: #008CFF; 
    }

    &:active {
        background-color: #006BDF; 
    }
`;

const RecentUpdate = styled.div` // 캐릭터 정보 박스 내부의 최근 정보 갱신 일자
    color: white;
    font-size: 12.5px;
    margin-top: 10px;
`;

const SearchBar = styled.form` // 캐릭터 정보 박스 내부의 캐릭터 검색 컨테이너
    display: flex;
    margin-top: 10px;
`;

const InputField = styled.input` // 캐릭터 검색 컨테이너 내부의 검색 필드
    width: 15vw;
    height: 3vh;
    padding: 5px;
    font-size: 12px;
    border: 3px solid #F6A730;
    border-radius: 10px;

    ::placeholder { 
        color: #EFEFEF; 
    }

    &:focus {
        border-color: #5CB85C; 
        outline: none; 
    }
`;

const SearchButton = styled.button` // 캐릭터 검색 컨테이너 내부의 검색 버튼
    cursor: pointer;
    margin-left: 10px;
    width: 5vw;
    height: 5vh;
    border: none;
    border-radius: 5px;
    padding: 5px;
    font-size: 15px;
    font-weight: bold;
    background-color: #5CB85C;
    color: white;
`;

const BannerAd = styled(Swiper)` // 유저 정보 박스 내부의 스와이퍼 광고 배너
    width: 25vw;
    height: 25vh;
    margin-top: 2.5vh;
    border-radius: 10px;
`;

const BannerSlide = styled(SwiperSlide)` // 광고배너 내부의 스와이퍼 슬라이드
    width: 100%;
    height: 100%;
`;

const SlideImage = styled.div` // 스와이퍼 슬라이드 내부의 광고 이미지
    background-image: url(${props => props.imageUrl});
    background-size: cover;
    height: 100%;
    width: 100%;
`;

const NaviBar = styled.div` // 네비바 최상위 컨테이너
    display: flex; 
    margin: auto;
    margin-top: 2.5vh;
`;

const NaviButton = styled.div` // 네비바 컨테이너 내부의 네비 버튼
    cursor: pointer;
    width: 20vw;
    height: 10vh;
    border: 1px solid white;
    border-radius: 15px;
    font-family: maple-font;
    font-size: 20px;
    background-color: ${props => props.active ? "#5CB85C" : "#363944"}; 
    color: white;
    text-align: center;
    line-height: 10vh;

    &:hover {
        background-color: ${props => props.active ? "#5CB85C" : "#38393D"};
        color: ${props => props.active ? "white" : "#5CB85C"};
    }
`;

const DetailInfoContainer = styled.div` // 캐릭터 상세정보 결과 최상위 컨테이너
    width: 80vw;
    margin: auto;
    margin-top: 2.5vh;
`;
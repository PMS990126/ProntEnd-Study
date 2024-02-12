import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Hero from '../picture/class/Warrior/Hero.jpg';
import Paladin from '../picture/class/Warrior/Paladin.jpg';
import Dark_knight from '../picture/class/Warrior/Dark knight.jpg';
import Soul_master from '../picture/class/Warrior/Soul master.jpg';
import Mihile from '../picture/class/Warrior/Mihile.jpg';
import Blaster from '../picture/class/Warrior/Blaster.jpg';
import Demon_slayer from '../picture/class/Warrior/Demon slayer.jpg';
import Demon_avenger from '../picture/class/Warrior/Demon avenger.jpg';
import Aran from '../picture/class/Warrior/Aran.jpg';
import Kaiser from '../picture/class/Warrior/Kaiser.jpg';
import Adel from '../picture/class/Warrior/Adel.jpg';
import Zero from '../picture/class/Warrior/Zero.jpg';

import ArchMage_Fire_Poison from '../picture/class/Wizard/Arch Mage (Fire, Poison).jpg';
import ArchMage_Ice_Lightning from '../picture/class/Wizard/Arch Mage (Ice, Lightning).jpg';
import Bishop from '../picture/class/Wizard/Bishop.jpg';
import Flame_wizard from '../picture/class/Wizard/Flame wizard.jpg';
import Battle_mage from '../picture/class/Wizard/Battle mage.jpg';
import Evan from '../picture/class/Wizard/Evan.jpg';
import Luminous from '../picture/class/Wizard/Luminous.jpg';
import Illium from '../picture/class/Wizard/Illium.jpg';
import Kinesis from '../picture/class/Wizard/Kinesis.jpg';
import Lala from '../picture/class/Wizard/Lala.jpg';

import Bow_master from '../picture/class/Archer/Bow master.jpg';
import Marksman from '../picture/class/Archer/Marksman.jpg';
import Path_finder from '../picture/class/Archer/Path finder.jpg';
import Wind_breaker from '../picture/class/Archer/Wind breaker.jpg';
import Wild_hunter from '../picture/class/Archer/Wild hunter.jpg';
import Mercedes from '../picture/class/Archer/Mercedes.jpg';
import Kain from '../picture/class/Archer/Kain.jpg';

import Night_lord from '../picture/class/Thief/Night lord.jpg';
import Shadower from '../picture/class/Thief/Shadower.jpg';
import Dual_blade from '../picture/class/Thief/Dual blade.jpg';
import Night_worker from '../picture/class/Thief/Night worker.jpg';
import Xenon from '../picture/class/Thief/Xenon.jpg';
import Phantom from '../picture/class/Thief/Phantom.jpg';
import Cadena from '../picture/class/Thief/Cadena.jpg';
import Khali from '../picture/class/Thief/Khali.jpg';
import Ho_young from '../picture/class/Thief/Ho young.jpg';

import Viper from '../picture/class/Pirate/Viper.jpg';
import Captain from '../picture/class/Pirate/Captain.jpg';
import Cannon_shooter from '../picture/class/Pirate/Cannon shooter.jpg';
import Striker from '../picture/class/Pirate/Striker.jpg';
import Mechanic from '../picture/class/Pirate/Mechanic.jpg';
import Eunwol from '../picture/class/Pirate/Eunwol.jpg';
import Angelic_buster from '../picture/class/Pirate/Angelic buster.jpg';
import Ark from '../picture/class/Pirate/Ark.jpg';

import Beginner from '../picture/class/Beginner.png';


const charClass = {
    초보자: Beginner,
    히어로: Hero,
    팔라딘: Paladin,
    다크나이트: Dark_knight,
    소울마스터: Soul_master,
    미하일: Mihile,
    블래스터: Blaster,
    데몬슬레이어: Demon_slayer,
    데몬어벤져: Demon_avenger,
    아란: Aran,
    카이저: Kaiser,
    아델: Adel,
    제로: Zero,
    아크메이지불독: ArchMage_Fire_Poison,
    아크메이지썬콜: ArchMage_Ice_Lightning,
    비숍: Bishop,
    플레임위자드: Flame_wizard,
    배틀메이지: Battle_mage,
    에반: Evan,
    루미너스: Luminous,
    일리움: Illium,
    라라: Lala,
    키네시스: Kinesis,
    보우마스터: Bow_master,
    신궁: Marksman,
    패스파인더: Path_finder,
    윈드브레이커: Wind_breaker,
    와일드헌터: Wild_hunter,
    메르세데스: Mercedes,
    카인: Kain,
    나이트로드: Night_lord,
    섀도어: Shadower,
    듀얼블레이더: Dual_blade,
    나이트워커: Night_worker,
    제논: Xenon,
    팬텀: Phantom,
    카데나: Cadena,
    칼리: Khali,
    호영: Ho_young,
    바이퍼: Viper,
    캡틴: Captain,
    캐논마스터: Cannon_shooter,
    스트라이커: Striker,
    메카닉: Mechanic,
    은월: Eunwol,
    엔젤릭버스터: Angelic_buster,
    아크: Ark,
};


export default function Stats() {

    const NEXON_OPEN_API_KEY = process.env.REACT_APP_NEXON_OPEN_API_KEY;
    
    const queryParams = new URLSearchParams(window.location.search);

    const charName = queryParams.get("input"); // 검색한 캐릭터 이름 가져오기
    const searchDate = queryParams.get("date"); // 검색한 날짜&시간 가져오기

    const [combatPower, setCombatPower] = useState(0);
    const [minStatAttackPower, setMinStatAttackPower] = useState(0);
    const [maxStatAttackPower, setMaxStatAttackPower] = useState(0);
    const [hp, setHp] = useState(0);
    const [mp, setMp] = useState(0);
    const [str, setStr] = useState(0);
    const [dex, setDex] = useState(0);
    const [int, setInt] = useState(0);
    const [luk, setLuk] = useState(0);
    const [damage, setDamage] = useState(0);
    const [finalDamage, setFinalDamage] = useState(0);
    const [bossDamage, setBossDamage] = useState(0);
    const [charClass, setCharClass] = useState("");


    const fetchUserStat = async () => {
        try{

            const getOcid = await axios.get(`https://open.api.nexon.com/maplestory/v1/id?character_name=${charName}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            const ocid = getOcid.data.ocid;

            const getUserStat = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});

            const {final_stat} = getUserStat.data;

            const getCharBasicInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});

            const {character_class} = getCharBasicInfo.data;

            setCharClass(character_class);

            final_stat.forEach(value => {
                switch(value.stat_name) {
                    case '전투력':
                    setCombatPower(value.stat_value);
                    break;
                    case '최소 스탯 공격력':
                    setMinStatAttackPower(value.stat_value);
                    break;
                    case '최대 스탯 공격력':
                    setMaxStatAttackPower(value.stat_value);
                    break;
                    case 'HP':
                    setHp(value.stat_value);
                    break;
                    case 'MP':
                    setMp(value.stat_value);
                    break;
                    case 'STR':
                    setStr(value.stat_value);
                    break;
                    case 'DEX':
                    setDex(value.stat_value);
                    break;
                    case 'INT':
                    setInt(value.stat_value);
                    break;
                    case 'LUK':
                    setLuk(value.stat_value);
                    break;
                    case '데미지':
                    setDamage(value.stat_value);
                    break;
                    case '최종 데미지':
                    setFinalDamage(value.stat_value);
                    break;
                    case '보스 몬스터 데미지':
                    setBossDamage(value.stat_value);
                    break;
                    default:
                    break;
                }
            });


        } catch (error) {console.log(error.response)}
    }

    useEffect (() => {
        const charName = queryParams.get("input");

        if(charName) {
            fetchUserStat();
        }
    }, [charName]);

    return(
        <Container>
            스탯
            <StatContainer>
                <UserImgContainer charClass = {charClass} alt = "직업사진" />
                <ColumnContainer>
                    <StatNameContainer>전투력</StatNameContainer>
                    <DetailContainer>{Number(combatPower).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>스탯 공격력</StatNameContainer>
                    <DetailContainer>{minStatAttackPower}~{maxStatAttackPower}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>HP</StatNameContainer>
                    <DetailContainer>{Number(hp).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>MP</StatNameContainer>
                    <DetailContainer>{Number(mp).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>STR</StatNameContainer>
                    <DetailContainer>{Number(str).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>DEX</StatNameContainer>
                    <DetailContainer>{Number(dex).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>INT</StatNameContainer>
                    <DetailContainer>{Number(int).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>LUK</StatNameContainer>
                    <DetailContainer>{Number(luk).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>데미지</StatNameContainer>
                    <DetailContainer>{Number(damage).toLocaleString()}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>최종 데미지</StatNameContainer>
                    <DetailContainer>{Number(finalDamage).toLocaleString()}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>보스 몬스터 데미지</StatNameContainer>
                    <DetailContainer>{Number(bossDamage).toLocaleString()}%</DetailContainer>
                </ColumnContainer>
                

            </StatContainer>
        </Container>

    )

};

const Container = styled.div`
    display: flex;
    flex-direction: column;

`;

const UserImgContainer = styled.div`
    background-image: url(${(probs) => charClass[probs.charClass]});
    background-size: cover;
    width: 100px;
    height: 100px;
    margin-right: 5px;
`;



const StatContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    align-items: center;
    justify-content: center;
`;

const StatNameContainer = styled.div`
    display: flex;
    font-size: 15px;
`
const DetailContainer = styled.div`
    display: flex;
`;




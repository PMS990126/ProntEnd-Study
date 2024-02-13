import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import "./Component.css";

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
import Dual_blader from '../picture/class/Thief/Dual blade.jpg';
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
    듀얼블레이더: Dual_blader,
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

function addUnit(number) {
    if (number >= 100000000) {
      const billion = Math.floor(number / 100000000);
      const million = Math.floor((number % 100000000) / 10000);
      const remainder = number % 10000;
      
      let result = billion + '억';
      if (million > 0) {
        result += ' ' + million + '만';
      }
      if (remainder > 0) {
        result += ' ' + remainder;
      }
      
      return result;
    } else if (number >= 10000) {
      const million = Math.floor(number / 10000);
      const remainder = number % 10000;
      
      let result = million + '만';
      if (remainder > 0) {
        result += ' ' + remainder;
      }
      
      return result;
    } else {
      return number.toString();
    }
  }


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
    const [attack, setAttack] = useState(0);
    const [horsepower, setHorsepower] = useState(0);
    const [ignoreERA, setIgnoreERA] = useState(0);
    const [criticalChance, setCriticalChance] = useState(0);
    const [criticalDamage, setCriticalDamage] = useState(0);
    const [starforce, setStarforce] = useState(0);
    const [arcaneforce, setArcaneforce] = useState(0);
    const [authenticforce, setAuthenticforce] = useState(0);
    const [cooldownReduction, setCooldownReduction] = useState(0);
    const [cooldownPercent, setCooldownPercent] = useState(0);
    const [CTNA, setCTNA] = useState(0); //cooldown time not applied, 재사용 대기시간 미적용
    const [IAR, setIAR] = useState(0); //ignore attribute resistance, 속성 내성 무시
    const [additionalDamage, setAdditionalDamage] = useState(0);
    const [resistance, setResistance] = useState(0);
    const [plusEXP, setPlusEXP] = useState(0);
    const [incMinionDuraion, setIncMinionDuration] = useState(0);
    const [proficiency, setProficiency] = useState(0);
    const [stance, setStance] = useState(0);
    const [guard, setGuard] = useState(0);
    const [buffDuration, setBuffDuration] = useState(0);
    const [moveSpeed, setMoveSpeed] = useState(0);
    const [jump, setJump] = useState(0);
    const [attackSpeed, setAttackSpeed] = useState(0);
    const [itemDrop, setItemDrop] = useState(0);
    const [mesoDrop, setMesoDrop] = useState(0);
    const [apSTR, setApSTR] = useState(0);
    const [apDEX, setApDEX] = useState(0);
    const [apINT, setApINT] = useState(0);
    const [apLUK, setApLUK] = useState(0);
    const [apHP, setApHP] = useState(0);
    const [apMP, setApMP] = useState(0);

    const [abilityPreset1, setAbilityPreset1] = useState("");
    const [abilityPreset2, setAbilityPreset2] = useState("");
    const [abilityPreset3, setAbilityPreset3] = useState("");
    const [selectAbPreset, setSelectAbPreset] = useState(0);
    const abPresets = [abilityPreset1, abilityPreset2, abilityPreset3];

    const handleAbPresetClick = (presetIndex) => {
        setSelectAbPreset(presetIndex);
    };

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
                    case '최소 스탯공격력':
                    setMinStatAttackPower(value.stat_value);
                    break;
                    case '최대 스탯공격력':
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
                    case '공격력':
                    setAttack(value.stat_value);
                    break;
                    case '마력':
                    setHorsepower(value.stat_value);
                    break;
                    case '방어율 무시':
                    setIgnoreERA(value.stat_value);
                    break;
                    case '크리티컬 확률':
                    setCriticalChance(value.stat_value);
                    break;
                    case '크리티컬 데미지':
                    setCriticalDamage(value.stat_value);
                    break;
                    case '스타포스':
                    setStarforce(value.stat_value);
                    break;
                    case '아케인포스':
                    setArcaneforce(value.stat_value);
                    break;
                    case '어센틱포스':
                    setAuthenticforce(value.stat_value);
                    break;
                    case '재사용 대기시간 감소 (초)':
                    setCooldownReduction(value.stat_value);
                    break;
                    case '재사용 대기시간 감소 (%)':
                    setCooldownPercent(value.stat_value);
                    break;
                    case '재사용 대기시간 미적용':
                    setCTNA(value.stat_value);
                    break;
                    case '속성 내성 무시':
                    setIAR(value.stat_value);
                    break;
                    case '상태이상 추가 데미지':
                    setAdditionalDamage(value.stat_value);
                    break;
                    case '상태이상 내성':
                    setResistance(value.stat_value);
                    break;
                    case '추가 경험치 획득':
                    setPlusEXP(value.stat_value);
                    break;
                    case '소환수 지속시간 증가':
                    setIncMinionDuration(value.stat_value);
                    break;
                    case '무기 숙련도':
                    setProficiency(value.stat_value);
                    break;
                    case '스탠스':
                    setStance(value.stat_value);
                    break;
                    case '방어력':
                    setGuard(value.stat_value);
                    break;
                    case '버프 지속시간':
                    setBuffDuration(value.stat_value);
                    break;
                    case '이동속도':
                    setMoveSpeed(value.stat_value);
                    break;
                    case '점프력':
                    setJump(value.stat_value);
                    break;
                    case '공격 속도':
                    setAttackSpeed(value.stat_value);
                    break;
                    case '아이템 드롭률':
                    setItemDrop(value.stat_value);
                    break;
                    case '메소 획득량':
                    setMesoDrop(value.stat_value);
                    break;
                    case 'AP 배분 STR':
                    setApSTR(value.stat_value);
                    break;
                    case 'AP 배분 DEX':
                    setApDEX(value.stat_value);
                    break;
                    case 'AP 배분 INT':
                    setApINT(value.stat_value);
                    break;
                    case 'AP 배분 LUK':
                    setApLUK(value.stat_value);
                    break;
                    case 'AP 배분 HP':
                    setApHP(value.stat_value);
                    break;
                    case 'AP 배분 MP':
                    setApMP(value.stat_value);
                    break;
                    default:
                    break;
                }
            });

            const getAbilityInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/ability?ocid=${ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});

            const { ability_preset_1, ability_preset_2, ability_preset_3 } = getAbilityInfo.data;

            setAbilityPreset1(ability_preset_1.ability_info.map(({ability_no, ability_grade, ability_value}) => {
                return {ability_no, ability_grade, ability_value};
            }));

            setAbilityPreset2(ability_preset_2.ability_info.map(({ability_no, ability_grade, ability_value}) => {
                return {ability_no, ability_grade, ability_value};
            }));

            setAbilityPreset3(ability_preset_3.ability_info.map(({ability_no, ability_grade, ability_value}) => {
                return {ability_no, ability_grade, ability_value};
            }));




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
            <CpContainer>
                <UserImgContainer charClass = {charClass} alt = "직업사진" />
                
                <CpContainer>전투력</CpContainer>
                <CpContainer>{addUnit(combatPower)}</CpContainer>
            
            </CpContainer>
            
            <StatContainer>
                
                <ColumnContainer>
                    <StatNameContainer>스탯 공격력</StatNameContainer>
                    <DetailContainer>{Number(minStatAttackPower).toLocaleString()} ~ {Number(maxStatAttackPower).toLocaleString()}</DetailContainer>
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
            ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
            <OtherInfoContainer>
                <ColumnContainer>
                    <StatNameContainer>공격력</StatNameContainer>
                    <DetailContainer>{Number(attack).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>마력</StatNameContainer>
                    <DetailContainer>{Number(horsepower).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>방어율 무시</StatNameContainer>
                    <DetailContainer>{ignoreERA}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>크리티컬 확률</StatNameContainer>
                    <DetailContainer>{criticalChance}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>크리티컬 데미지</StatNameContainer>
                    <DetailContainer>{criticalDamage}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>스타포스</StatNameContainer>
                    <DetailContainer>{starforce}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>아케인포스</StatNameContainer>
                    <DetailContainer>{Number(arcaneforce).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>어센틱포스</StatNameContainer>
                    <DetailContainer>{authenticforce}</DetailContainer>
                </ColumnContainer>
            </OtherInfoContainer>
            ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
            <OtherInfoContainer>
                <ColumnContainer>
                    <StatNameContainer>재사용 대기시간 감소 (초)</StatNameContainer>
                    <DetailContainer>{cooldownReduction}초</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>재사용 대기시간 감소 (%)</StatNameContainer>
                    <DetailContainer>{cooldownPercent}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>재사용 대기시간 미적용</StatNameContainer>
                    <DetailContainer>{CTNA}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>속성 내성 무시</StatNameContainer>
                    <DetailContainer>{IAR}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>상태이상 추가 데미지</StatNameContainer>
                    <DetailContainer>{additionalDamage}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>상태이상 내성</StatNameContainer>
                    <DetailContainer>{resistance}</DetailContainer>
                </ColumnContainer>
                
            </OtherInfoContainer>
            ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
            <OtherInfoContainer>
                <ColumnContainer>
                    <StatNameContainer>추가 경험치 획득</StatNameContainer>
                    <DetailContainer>{plusEXP}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>소환수 지속시간 증가</StatNameContainer>
                    <DetailContainer>{incMinionDuraion}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>무기 숙련도</StatNameContainer>
                    <DetailContainer>{proficiency}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>스탠스</StatNameContainer>
                    <DetailContainer>{stance}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>방어력</StatNameContainer>
                    <DetailContainer>{Number(guard).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>버프 지속시간</StatNameContainer>
                    <DetailContainer>{buffDuration}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>이동속도</StatNameContainer>
                    <DetailContainer>{moveSpeed}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>점프력</StatNameContainer>
                    <DetailContainer>{jump}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>공격 속도</StatNameContainer>
                    <DetailContainer>{attackSpeed}단계</DetailContainer>
                </ColumnContainer>
                
            </OtherInfoContainer>
            ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
            <OtherInfoContainer>
            <ColumnContainer>
                    <StatNameContainer>아이템 드롭률</StatNameContainer>
                    <DetailContainer>{itemDrop}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>메소 획득량</StatNameContainer>
                    <DetailContainer>{mesoDrop}%</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>AP 배분 STR</StatNameContainer>
                    <DetailContainer>{Number(apSTR).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>AP 배분 DEX</StatNameContainer>
                    <DetailContainer>{Number(apDEX).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>AP 배분 INT</StatNameContainer>
                    <DetailContainer>{Number(apINT).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>AP 배분 LUK</StatNameContainer>
                    <DetailContainer>{Number(apLUK).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>AP 배분 HP</StatNameContainer>
                    <DetailContainer>{Number(apHP).toLocaleString()}</DetailContainer>
                </ColumnContainer>
                <ColumnContainer>
                    <StatNameContainer>AP 배분 MP</StatNameContainer>
                    <DetailContainer>{Number(apMP).toLocaleString()}</DetailContainer>
                </ColumnContainer>
            </OtherInfoContainer>

            <Asdf>
                어빌리티
            </Asdf>
            <BtContainer>
                <PresetButton onClick={() => handleAbPresetClick(0)}>프리셋 1</PresetButton>
                <PresetButton onClick={() => handleAbPresetClick(1)}>프리셋 2</PresetButton>
                <PresetButton onClick={() => handleAbPresetClick(2)}>프리셋 3</PresetButton>
            </BtContainer>

            <AbilityContainer>
                {abPresets[selectAbPreset] ? (
                    abPresets[selectAbPreset].map((ability, index) => (
                        <Abilitybox1 key={index}>
                            <Abilitybox>{ability.ability_no}</Abilitybox>
                            <Abilitybox>{ability.ability_grade}</Abilitybox>
                            <Abilitybox>{ability.ability_value} </Abilitybox>
                        </Abilitybox1>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </AbilityContainer>

        </Container>

    )

};

const Container = styled.div`
    display: flex;
    flex-direction: column; 
    margin-bottom: 100px;
    

`;

const CpContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    font-family: 'NEXONLv1GothicBold';
    margin-bottom: 10px;
`;

const UserImgContainer = styled.div`
    background-image: url(${(probs) => charClass[probs.charClass]});
    background-size: cover;
    width: 250px;
    height: 250px;
`;



const StatContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'NEXONLv1GothicRegular';
    
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
    margin-bottom: 7px;
`
const DetailContainer = styled.div`
    display: flex;
    font-size: 18px;
`;

const OtherInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'NEXONLv1GothicRegular';
`;

const BtContainer = styled.div`
    display: flex;
    align-items: left;
    justify-content: left;
    margin-left: 130px;
`;

const AbilityContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 35vw;
    margin-top: 10px;
`;

const Asdf = styled.div`
    display: flex;
    align-items: left;
    justify-content: left;
    margin-left: 235px;
    margin-bottom: 20px;
    font-family: 'NEXONLv1GothicBold';

`
const PresetButton = styled.button`
  background-color: #f1f1f1;
  border: none;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  padding: 8px 16px;
  font-family: 'NEXONLv1GothicRegular';

  &:hover {
    background-color: #ccc;
  }
`;

const Abilitybox1 = styled.div`
    display: flex;
    flex-direction: column;    
`

const Abilitybox = styled.div`
    align-items: left;
    justify-content: left;    
`;




import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import styled from 'styled-components';
import axios from "axios"
import Adele from "../images/Adele.png";
import Angelic_Buster from "../images/Angelic_Buster.png";
import Aran from "../images/Aran.png";
import ArchMage_Fire_Poison from "../images/ArchMage_Fire_Poison.png";
import ArchMage_Ice_Lightning from "../images/ArchMage_Ice_Lightning.png";
import Ark from "../images/Ark.png";
import Battle_Mage from "../images/Battle_Mage.png";
import Beginner from "../images/Beginner.png";
import Bishop from "../images/Bishop.png";
import Blaster from "../images/Blaster.png";
import Bow_Master from "../images/Bow_Master.png";
import Cadena from "../images/Cadena.png";
import Cannon_Shooter from "../images/Cannon_Shooter.png";
import Captain from "../images/Captain.png";
import Citizen from "../images/Citizen.png";
import Dark_Knight from "../images/Dark_Knight.png";
import Demon_Avenger from "../images/Demon_Avenger.png";
import Demon_Slayer from "../images/Demon_Slayer.png";
import Dual_Blade from "../images/Dual_Blade.png";
import Eunwol from "../images/Eunwol.png";
import Evan from "../images/Evan.png";
import Flame_Wizard from "../images/Flame_Wizard.png";
import Hero from "../images/Hero.png";
import Hoyoung from "../images/Hoyoung.png";
import Illium from "../images/Illium.png";
import Kain from "../images/Kain.png";
import Kaiser from "../images/Kaiser.png";
import Khali from "../images/Khali.png";
import Kinesis from "../images/Kinesis.png";
import Lara from "../images/Lara.png";
import Luminous from "../images/Luminous.png";
import Marks_Man from "../images/Marks_Man.png";
import Mechanic from "../images/Mechanic.png";
import Mercedes from "../images/Mercedes.png";
import Mihile from "../images/Mihile.png";
import Night_Lord from "../images/Night_Lord.png";
import Night_Walker from "../images/Night_Walker.png";
import Noblesse from "../images/Noblesse.png";
import Paladin from "../images/Paladin.png";
import Path_Finder from "../images/Path_Finder.png";
import Phantom from "../images/Phantom.png";
import Shadower from "../images/Shadower.png";
import Soul_Master from "../images/Soul_Master.png";
import Striker from "../images/Striker.png";
import Viper from "../images/Viper.png";
import Wild_Hunter from "../images/Wild_Hunter.png";
import Wind_Breaker from "../images/Wind_Breaker.png";
import Xenon from "../images/Xenon.png";
import Zero from "../images/Zero.png";

export default function Stats_Equipment({ocid}) {

    const characterImages = {
        "아델": Adele,
        "엔젤릭버스터": Angelic_Buster,
        "아란": Aran,
        "아크메이지(불,독)": ArchMage_Fire_Poison,
        "아크메이지(썬,콜)": ArchMage_Ice_Lightning,
        "아크": Ark,
        "배틀메이지": Battle_Mage,
        "초보자": Beginner,
        "비숍": Bishop,
        "블래스터": Blaster,
        "보우마스터": Bow_Master,
        "카데나": Cadena,
        "캐논마스터": Cannon_Shooter,
        "캡틴": Captain,
        "시티즌": Citizen,
        "다크나이트": Dark_Knight,
        "데몬어벤져": Demon_Avenger,
        "데몬슬레이어": Demon_Slayer,
        "듀얼블레이더": Dual_Blade,
        "은월": Eunwol,
        "에반": Evan,
        "플레임위자드": Flame_Wizard,
        "히어로": Hero,
        "호영": Hoyoung,
        "일리움": Illium,
        "카인": Kain,
        "카이저": Kaiser,
        "칼리": Khali,
        "키네시스": Kinesis,
        "라라": Lara,
        "루미너스": Luminous,
        "신궁": Marks_Man,
        "메카닉": Mechanic,
        "메르세데스": Mercedes,
        "미하일": Mihile,
        "나이트로드": Night_Lord,
        "나이트워커": Night_Walker,
        "노블레스": Noblesse,
        "팔라딘": Paladin,
        "패스파인더": Path_Finder,
        "팬텀": Phantom,
        "섀도어": Shadower,
        "소울마스터": Soul_Master,
        "스트라이커": Striker,
        "바이퍼": Viper,
        "와일드헌터": Wild_Hunter,
        "윈드브레이커": Wind_Breaker,
        "제논": Xenon,
        "제로": Zero
    };    

    const NEXON_OPEN_API_KEY = process.env.REACT_APP_NEXON_OPEN_API_KEY; // 넥슨 오픈 Api key

    const location = useLocation(); // URL 정보 객체 반환 훅
    const queryParams = new URLSearchParams(location.search);
    const searchDate = queryParams.get("date"); // 검색한 날짜&시간 가져오기

    const [charImg, setCharImg] = useState(""); // 직업 이미지
    const [minAttackStat, setMinAttackStat] = useState(""); // 최소 스공
    const [maxAttackStat, setMaxAttackStat] = useState(""); // 최대 스공
    const [damage, setDamage] = useState(""); // 데미지
    const [bossMonsterDamage, setBossMonsterDamage] = useState(""); // 보공
    const [finalDamage, setFinalDamage] = useState(""); // 최종뎀
    const [ignoreDefenseRate, setIgnoreDefenseRate] = useState(""); // 방무
    const [criticalRate, setCriticalRate] = useState(""); // 크확
    const [criticalDamage, setCriticalDamage] = useState(""); // 크뎀
    const [abnormalStatusResistance, setAbnormalStatusResistance] = useState(""); // 상태이상 저항
    const [stance, setStance] = useState(""); // 스탠스
    const [defense, setDefense] = useState(""); // 방어력
    const [moveSpeed, setMoveSpeed] = useState(""); // 이동속도
    const [jump, setJump] = useState(""); // 점프력
    const [starForce, setStarForce] = useState(""); // 스타포스
    const [arcaneForce, setArcaneForce] = useState(""); // 아케인포스
    const [authenticForce, setAuthenticForce] = useState(""); // 어센틱포스
    const [STR, setSTR] = useState(""); // STR 
    const [DEX, setDEX] = useState(""); // DEX 
    const [INT, setINT] = useState(""); // INT 
    const [LUK, setLUK] = useState(""); // LUK 
    const [HP, setHP] = useState(""); // HP
    const [MP, setMP] = useState(""); // MP
    const [AP_STR, setAP_STR] = useState(""); // AP 배분 STR
    const [AP_DEX, setAP_DEX] = useState(""); // AP 배분 DEX
    const [AP_INT, setAP_INT] = useState(""); // AP 배분 INT
    const [AP_LUK, setAP_LUK] = useState(""); // AP 배분 LUK
    const [AP_HP, setAP_HP] = useState(""); // AP 배분 HP
    const [AP_MP, setAP_MP] = useState(""); // AP 배분 MP
    const [itemDropRate, setItemDropRate] = useState(""); // 아이템 드롭률
    const [mesoAcquisition, setMesoAcquisition] = useState(""); // 메소 획득량
    const [buffDuration, setBuffDuration] = useState(""); // 버프 지속시간
    const [attackSpeed, setAttackSpeed] = useState(""); // 공격속도
    const [normalMonsterDamage, setNormalMonsterDamage] = useState(""); // 일몹뎀
    const [coolTimeReduction_sec, setCoolTimeReduction_sec] = useState(""); // 쿨감(초)
    const [coolTimeReduction_percent, setCoolTimeReduction_percent] = useState(""); // 쿨감(%)
    const [coolTimeNotApplied, setCoolTimeNotApplied] = useState(""); // 쿨감 미적용 스킬
    const [ignoreAttributeResistance, setIgnoreAttributeResistance] = useState(""); // 속성 내성 무시
    const [additionalDamageAbnormalStatus, setAdditionalDamageAbnormalStatus] = useState(""); // 상추뎀
    const [weaponMastery, setWeaponMastery] = useState(""); // 무기 숙련도
    const [additionalExpAcquisition, setAdditionalExpAcquisition] = useState(""); // 추가 경험치 획득
    const [attackPower, setAttackPower] = useState(""); // 공격력
    const [magicPower, setMagicPower] = useState(""); // 마력
    const [combatPower, setCombatPower] = useState(""); // 전투력
    const [summonDurationIncrease, setSummonDurationIncrease] = useState(""); // 소환수 지속시간 증가

    const [abilityInfo, setAbilityInfo] = useState(null); // 캐릭터 어빌리티 정보
    const [selectedPreset, setSelectedPreset] = useState(0); // 현재 선택된 어빌리티 프리셋 번호
    const [currentPreset, setCurrentPreset] = useState(0); // 현재 선택된 어빌리티 프리셋의 정보

    const [hyperStatInfo, setHyperStatInfo] = useState(null); // 캐릭터 하이퍼 스탯 정보
    const [selectedHyperStatPreset, setSelectedHyperStatPreset] = useState(""); // 현재 선택된 하이퍼 스탯 프리셋 번호
    const [currentHyperStatPreset, setCurrentHyperStatPreset] = useState(""); // 현재 선택된 하이퍼 스탯 프리셋의 정보

    const fetchUserData = async () => {
        try{
            // 캐릭터 상세스탯 정보 가져오기
            const getCharStatInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            const {final_stat} = getCharStatInfo.data;
            const charImage = characterImages[getCharStatInfo.data.character_class];
            setCharImg(charImage)

            const statNames = [
                "최소 스탯공격력", "최대 스탯공격력", "데미지", "보스 몬스터 데미지", "최종 데미지", "방어율 무시", 
                "크리티컬 확률", "크리티컬 데미지", "상태이상 내성", "스탠스", "방어력", "이동속도", 
                "점프력", "스타포스", "아케인포스", "어센틱포스", "STR", "DEX", "INT", "LUK", "HP", "MP",
                "AP 배분 STR", "AP 배분 DEX", "AP 배분 INT", "AP 배분 LUK", "AP 배분 HP", "AP 배분 MP", 
                "아이템 드롭률", "메소 획득량", "버프 지속시간", "공격 속도", "일반 몬스터 데미지", 
                "재사용 대기시간 감소 (초)", "재사용 대기시간 감소 (%)", "재사용 대기시간 미적용", 
                "속성 내성 무시", "상태이상 추가 데미지", "무기 숙련도", "추가 경험치 획득", "공격력", "마력", "전투력", "소환수 지속시간 증가"
            ];

            let statObject = {};

            statNames.forEach(name => {statObject[name] = final_stat.find(stat => stat.stat_name === name);});

            const setters = {
                "최소 스탯공격력": setMinAttackStat,
                "최대 스탯공격력": setMaxAttackStat,
                "데미지": setDamage,
                "보스 몬스터 데미지": setBossMonsterDamage,
                "최종 데미지": setFinalDamage,
                "방어율 무시": setIgnoreDefenseRate,
                "크리티컬 확률": setCriticalRate,
                "크리티컬 데미지": setCriticalDamage,
                "상태이상 내성": setAbnormalStatusResistance,
                "스탠스": setStance,
                "방어력": setDefense,
                "이동속도": setMoveSpeed,
                "점프력": setJump,
                "스타포스": setStarForce,
                "아케인포스": setArcaneForce,
                "어센틱포스": setAuthenticForce,
                "STR": setSTR,
                "DEX": setDEX,
                "INT": setINT,
                "LUK": setLUK,
                "HP": setHP,
                "MP": setMP,
                "AP 배분 STR": setAP_STR,
                "AP 배분 DEX": setAP_DEX,
                "AP 배분 INT": setAP_INT,
                "AP 배분 LUK": setAP_LUK,
                "AP 배분 HP": setAP_HP,
                "AP 배분 MP": setAP_MP,
                "아이템 드롭률": setItemDropRate,
                "메소 획득량": setMesoAcquisition,
                "버프 지속시간": setBuffDuration,
                "공격 속도": setAttackSpeed,
                "일반 몬스터 데미지": setNormalMonsterDamage,
                "재사용 대기시간 감소 (초)": setCoolTimeReduction_sec,
                "재사용 대기시간 감소 (%)": setCoolTimeReduction_percent,
                "재사용 대기시간 미적용": setCoolTimeNotApplied,
                "속성 내성 무시": setIgnoreAttributeResistance,
                "상태이상 추가 데미지": setAdditionalDamageAbnormalStatus,
                "무기 숙련도": setWeaponMastery,
                "추가 경험치 획득": setAdditionalExpAcquisition,
                "공격력": setAttackPower,
                "마력": setMagicPower,
                "전투력": (value) => setCombatPower(parseInt(value, 10)),
                "소환수 지속시간 증가": setSummonDurationIncrease
            };

            Object.entries(setters).forEach(([stat_name, setter]) => {
                const stat = statObject[stat_name];
                if (stat) setter(stat.stat_value);
            }); 
            
            // 캐릭터 어빌리티 정보 가져오기
            const getAbilityInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/ability?ocid=${ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            setAbilityInfo(getAbilityInfo.data);
            setCurrentPreset(getAbilityInfo.data[`ability_preset_${getAbilityInfo.data.preset_no}`]);

            // 캐릭터 하이퍼 스탯 정보 가져오기
            const getHyperStatInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/hyper-stat?ocid=${ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            setHyperStatInfo(getHyperStatInfo.data);
            setCurrentHyperStatPreset(getHyperStatInfo.data[`hyper_stat_preset_${getHyperStatInfo.data.use_preset_no}`]);
        } catch(error) {console.log(error.response);}
    };

    function formatNumber(num) { // 전투력 유닛버전 변환 메서드
        const units = ["억", "만", ""];
        const splits = [100000000, 10000, 1];
    
        let result = "";
        for (let i = 0; i < splits.length; i++) {
            const value = Math.floor(num / splits[i]);
            if (value > 0) {
                result += `${value}${units[i]} `;
                num %= splits[i];
            }
        }    
        return result.trim();
    }

    const presetChange = (presetNo) => { // 어빌리티 프리셋 변경 메서드
        if (abilityInfo) {
            setCurrentPreset(abilityInfo[`ability_preset_${presetNo}`]);
            setSelectedPreset(presetNo);
        }
    };

    const hyperStatPresetChange = (presetNo) => { // 하이퍼 스탯 프리셋 변경 메서드
        if (hyperStatInfo) {
            setCurrentHyperStatPreset(hyperStatInfo[`hyper_stat_preset_${presetNo}`]);
            setSelectedHyperStatPreset(presetNo);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [ocid]);
    
    return (
      <Container>
          <StatContainer>
              <StatTitle>스탯 상세정보</StatTitle>
              <ClassAndPower>
                  <ClassBox>
                      <ClassImage CharImg = {charImg}></ClassImage>
                  </ClassBox>
                  <CombatPowerBox>
                      <CombatTitle>전투력</CombatTitle>
                      <CombatPower>{formatNumber(combatPower)}</CombatPower>
                  </CombatPowerBox>
              </ClassAndPower>
              <StatInfoBox style = {{borderBottom: "2px solid #DDE3E9"}}>
                  <StatName>스탯 공격력</StatName>
                  <StatInfo style = {{color: "red"}}>
                    {Number(minAttackStat).toLocaleString()} ~ {Number(maxAttackStat).toLocaleString()}
                  </StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>HP</StatName>
                  <StatInfo>{Number(HP).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>MP</StatName>
                  <StatInfo>{Number(MP).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>STR</StatName>
                  <StatInfo>{Number(STR).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>DEX</StatName>
                  <StatInfo>{Number(DEX).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>INT</StatName>
                  <StatInfo>{Number(INT).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA", borderBottom: "2px solid #DDE3E9"}}>
                  <StatName>LUK</StatName>
                  <StatInfo>{Number(LUK).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>데미지</StatName>
                  <StatInfo>{damage}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>최종 데미지</StatName>
                  <StatInfo>{finalDamage}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>보스 몬스터 데미지</StatName>
                  <StatInfo>{bossMonsterDamage}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA", borderBottom: "2px solid #DDE3E9"}}>
                  <StatName>일반 몬스터 데미지</StatName>
                  <StatInfo>{normalMonsterDamage}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>공격력</StatName>
                  <StatInfo>{Number(attackPower).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>마력</StatName>
                  <StatInfo>{Number(magicPower).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>방어율 무시</StatName>
                  <StatInfo>{ignoreDefenseRate}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>크리티컬 확률</StatName>
                  <StatInfo>{criticalRate}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA", borderBottom: "2px solid #DDE3E9"}}>
                  <StatName>크리티컬 데미지</StatName>
                  <StatInfo>{criticalDamage}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>스타포스</StatName>
                  <StatInfo>{Number(starForce).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>아케인포스</StatName>
                  <StatInfo>{Number(arcaneForce).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA", borderBottom: "2px solid #DDE3E9"}}>
                  <StatName>어센틱포스</StatName>
                  <StatInfo>{Number(authenticForce).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>재사용 대기시간 감소 (초)</StatName>
                  <StatInfo>{coolTimeReduction_sec}초</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>재사용 대기시간 감소 (%)</StatName>
                  <StatInfo>{coolTimeReduction_percent}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA", borderBottom: "2px solid #DDE3E9"}}>
                  <StatName>재사용 대기시간 미적용</StatName>
                  <StatInfo>{coolTimeNotApplied}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>속성 내성 무시</StatName>
                  <StatInfo>{ignoreAttributeResistance}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>상태이상 추가 데미지</StatName>
                  <StatInfo>{additionalDamageAbnormalStatus}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA", borderBottom: "2px solid #DDE3E9"}}>
                  <StatName>상태이상 내성</StatName>
                  <StatInfo>{Number(abnormalStatusResistance).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>추가 경험치 획득</StatName>
                  <StatInfo>{additionalExpAcquisition}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>소환수 지속시간 증가</StatName>
                  <StatInfo>{summonDurationIncrease}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>무기 숙련도</StatName>
                  <StatInfo>{weaponMastery}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>스탠스</StatName>
                  <StatInfo>{stance}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>방어력</StatName>
                  <StatInfo>{Number(defense).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA", borderBottom: "2px solid #DDE3E9"}}>
                  <StatName>버프 지속시간</StatName>
                  <StatInfo>{buffDuration}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>이동속도</StatName>
                  <StatInfo>{moveSpeed}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>점프력</StatName>
                  <StatInfo>{jump}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA", borderBottom: "2px solid #DDE3E9"}}>
                  <StatName>공격속도</StatName>
                  <StatInfo>{attackSpeed}단계</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>아이템 드롭률</StatName>
                  <StatInfo>{itemDropRate}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA", borderBottom: "2px solid #DDE3E9"}}>
                  <StatName>메소 획득량</StatName>
                  <StatInfo>{mesoAcquisition}%</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>AP 배분 STR</StatName>
                  <StatInfo>{Number(AP_STR).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>AP 배분 DEX</StatName>
                  <StatInfo>{Number(AP_DEX).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>AP 배분 INT</StatName>
                  <StatInfo>{Number(AP_INT).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>AP 배분 LUK</StatName>
                  <StatInfo>{Number(AP_LUK).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>AP 배분 HP</StatName>
                  <StatInfo>{Number(AP_HP).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <StatInfoBox style = {{backgroundColor: "#FAFAFA"}}>
                  <StatName>AP 배분 MP</StatName>
                  <StatInfo>{Number(AP_MP).toLocaleString()}</StatInfo>
              </StatInfoBox>
              <AbilityTitle>어빌리티 상세정보</AbilityTitle>
              <AbilityPresetBox>
                  <AbilityPresetButton onClick = {() => presetChange(1)} selected = {selectedPreset === 1}>프리셋 1</AbilityPresetButton>
                  <AbilityPresetButton onClick = {() => presetChange(2)} selected = {selectedPreset === 2}>프리셋 2</AbilityPresetButton>
                  <AbilityPresetButton onClick = {() => presetChange(3)} selected = {selectedPreset === 3} style = {{border: "none"}}>프리셋 3</AbilityPresetButton>
              </AbilityPresetBox>
              {currentPreset && ( <>
              <AbilityGrade grade = {currentPreset.ability_preset_grade}>&lt; {currentPreset.ability_preset_grade} 어빌리티 &gt;</AbilityGrade>
              {currentPreset.ability_info.map(info => (<AbilityInfo grade = {info.ability_grade}>&nbsp;&nbsp;● {info.ability_value}</AbilityInfo>))}</>)}
              <FameBox>
                  <FameTitle>보유 명성치 :</FameTitle>
                  <FameInfo>{abilityInfo?.remain_fame?.toLocaleString()}</FameInfo>
              </FameBox>
              <HyperStatTitle>하이퍼 스탯 상세정보</HyperStatTitle>
              <HyperStatPresetBox>
                  <HyperStatPresetButton onClick = {() => {hyperStatPresetChange("1")}} selected = {selectedHyperStatPreset === "1"}>프리셋 1</HyperStatPresetButton>
                  <HyperStatPresetButton onClick = {() => {hyperStatPresetChange("2")}} selected = {selectedHyperStatPreset === "2"}>프리셋 2</HyperStatPresetButton>
                  <HyperStatPresetButton onClick = {() => {hyperStatPresetChange("3")}} selected = {selectedHyperStatPreset === "3"} style = {{border: "none"}}>프리셋 3</HyperStatPresetButton>
              </HyperStatPresetBox>
              {currentHyperStatPreset && currentHyperStatPreset.map((info, index) => (
                  info.stat_level !== 0 && info.stat_increase !== null ? (
                      <HyperStatInfo style = {index === currentHyperStatPreset.length - 1 ? {border: "none"} : {}}>
                          <StatLevel>Lv.{info.stat_level}</StatLevel>
                          <StatIncrease>{info.stat_increase}</StatIncrease>
                      </HyperStatInfo>
                  ) : null
              ))}
          </StatContainer>
          <EquipmentContainer>

          </EquipmentContainer>
      </Container>
    );
}

const Container = styled.div` // 최상위 부모 컨테이너
    display: flex;
    width: 100%;
`;

const StatContainer = styled.div` // 최상위 컨테이너 내부의 스탯 컨테이너
    display: flex;
    flex-direction: column;
    width: 25%;
    margin-right: 5%;
    margin-bottom: 2.5%;
    border-radius: 10px;
    border: 2px solid #DDE3E9;
`;

const EquipmentContainer = styled.div` // 최상위 컨테이너 내부의 장비 컨테이너
    display: flex;
    flex-direction: column;
    width: 70%;
    border-radius: 10px;
    border: 2px solid #DDE3E9;
`;

const StatTitle = styled.div` // 스탯 컨테이너 내부의 최상단 제목 컴포넌트
    width: 100%;
    height: 5vh;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    line-height: 5vh;
    background-color: #ECEFF7;
    color: black;
    border-radius: 10px 10px 0px 0px;
    border-bottom: 2px solid #DDE3E9;
`;

const ClassAndPower = styled.div` // 스탯 컨테이너 내부의 직업&전투력 컨테이너
    display: flex;
    width: 100%;
    height: 10vh;
    border-bottom: 2px solid #DDE3E9;
`;

const ClassBox = styled.div` // 직업&전투력 컨테이너 내부의 직업 이미지 박스
    width: 30%;
    height: 10vh;
    border-right: 2px solid #DDE3E9;
`;

const ClassImage = styled.div` // 직업 이미지 박스 내부의 직업 일러스트 이미지
    width: 80%; 
    height: 8vh;
    background-image: url(${props => props.CharImg});
    background-size: cover;
    border-radius: 50%;
    margin-top: 10%;
    margin-left: 10%;
`;

const CombatPowerBox = styled.div` // 직업&전투력 컨테이너 내부의 전투력 박스
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const CombatTitle = styled.div` // 전투력 박스 내부의 제목 컴포넌트
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    background-color: #ECEFF7;
    border-bottom: 2px solid #DDE3E9;
    padding: 5px 0px;
`;

const CombatPower = styled.div` // 전투력 박스 내부의 전투력 정보
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    padding: 10px 0px;
    color: #008CFF;
`;

const StatInfoBox = styled.div` // 스탯 컨테이너 내부의 상세정보 박스
    display: flex;
    width: 100%;
    height: 5vh;
    justify-content: space-between;
`;

const StatName = styled.div` // 상세정보 박스 내부의 스탯명
    font-size: 15px;
    font-weight: bold;
    line-height: 5vh;
    margin-left: 10px;
`;

const StatInfo = styled.div` // 상세정보 박스 내부의 스탯정보
    font-size: 15px;
    line-height: 5vh;
    margin-right: 10px;
`;

const AbilityTitle = styled.div` // 스탯 컨테이너 내부의 어빌리티 제목 컴포넌트
    width: 100%;
    height: 5vh;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    line-height: 5vh;
    background-color: #ECEFF7;
    border-top: 2px solid #DDE3E9;
    border-bottom: 2px solid #DDE3E9;
`;

const AbilityPresetBox = styled.div` // 스탯 컨테이너 내부의 어빌리티 프리셋 박스
    display: flex;
    width: 100%;
    height: 5vh;
    border-bottom: 2px solid #DDE3E9;
`;

const AbilityPresetButton = styled.div` // 어빌리티 프리셋 박스 내부의 어빌리티 프리셋 버튼
    width: 33.3%;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    line-height: 5vh;
    border-right: 2px solid #DDE3E9;
    background-color: ${props => props.selected ? "#E9EAED" : "transparent"};

    &:hover {
        background-color: #FAFAFA;
    }
`;

const AbilityGrade = styled.div` // 스탯 컨테이너 내부의 현재 적용중인 어빌리티 등급
    width: 100%;
    height: 5vh;
    font-size: 15px;
    font-weight: bold;
    font-family: maple-font;
    text-align: center;
    line-height: 5vh;
    border-bottom: 2px solid #DDE3E9;
    color: white;
    background-color: ${props => {
        switch (props.grade) {
            case "레전드리":
                return "#5CB85C";
            case "유니크":
                return "#F6A730";
            case "에픽":
                return "#6D62A1";
            default:
                return "transparent";
        }
    }};
`;

const AbilityInfo = styled.div` // 스탯 컨테이너 내부의 어빌리티 정보
    width: 100%;
    height: 5vh;
    font-size: 15px;
    font-weight: bold;
    line-height: 5vh;
    border-bottom: 2px solid #DDE3E9;
    color: white;
    background-color: ${props => {
        switch (props.grade) {
            case "레전드리":
                return "#5CB85C";
            case "유니크":
                return "#F6A730";
            case "에픽":
                return "#6D62A1";
            default:
                return "transparent";
        }
    }};
`;

const FameBox = styled.div` // 스탯 컨테이너 내부의 보유 명성치 박스
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 5vh;
    line-height: 5vh;
    border-bottom: 2px solid #DDE3E9;
    background-color: #FAFAFA;
`;

const FameTitle = styled.div` // 명성치 박스 내부 제목 컴포넌트
    font-size: 15px;
    font-weight: bold;
    margin-left: 10px;
`;

const FameInfo = styled.div` // 명성치 박스 내부 명성치 정보
    fontsize: 15px;
    margin-right: 10px;
`;

const HyperStatTitle = styled.div` // 스탯 컨테이너 내부의 하이퍼 스탯 제목 컴포넌트
    width: 100%;
    height: 5vh;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    line-height: 5vh;
    background-color: #ECEFF7;
    border-bottom: 2px solid #DDE3E9;
`;

const HyperStatPresetBox = styled.div` // 스탯 컨테이너 내부의 하이퍼 스탯 프리셋 박스
    display: flex;
    width: 100%;
    height: 5vh;
    border-bottom: 2px solid #DDE3E9;
`;

const HyperStatPresetButton = styled.div` // 하이퍼 스탯 프리셋 박스 내부의 하이퍼 스탯 프리셋 버튼
    width: 33.3%;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    line-height: 5vh;
    border-right: 2px solid #DDE3E9;
    background-color: ${props => props.selected ? "#E9EAED" : "transparent"};

    &:hover {
        background-color: #FAFAFA;
    }
`;

const HyperStatInfo = styled.div` // 스탯 컨테이너 내부의 하이퍼 스탯 정보 컨테이너
    display: flex;
    width: 100%;
    height: 5vh;
    border-bottom: 2px solid #DDE3E9;
    background-color: #FAFAFA;
`;

const StatLevel = styled.div` // 하이퍼 스탯 정보 컨테이너 내부의 하이퍼 스탯 레벨
    width: 15%;
    height: 3vh;
    font-size: 15px;
    font-weight: bold;
    margin-top: 1vh;
    margin-left: 10px;
    background-color: #E9EAED;
    border-radius: 5px;
    text-align: center;
`;

const StatIncrease = styled.div` // 하이퍼 스탯 정보 컨테이너 내부의 하이퍼 스탯값
    font-size: 12.5px;
    line-height: 5vh;
    margin-left: 10px;
`;
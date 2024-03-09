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
import Background_Cover from "../images/Background_Cover.png";
import Epic_Cover from "../images/Epic_Cover.png";
import Legendary_Cover from "../images/Legendary_Cover.png";
import Light_Effect from "../images/Light_Effect.png";
import Rare_Cover from "../images/Rare_Cover.png";
import Unique_Cover from "../images/Unique_Cover.png";
import Item_Class from "../images/Item_Class.png";
import Epic_Grade from "../images/Epic_Grade.png";
import Legendary_Grade from "../images/Legendary_Grade.png";
import Rare_Grade from "../images/Rare_Grade.png";
import Unique_Grade from "../images/Unique_Grade.png";

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

    const charClass = {
        "아델": "전사",
        "엔젤릭버스터": "해적(DEX)",
        "아란": "전사",
        "아크메이지(불,독)": "마법사",
        "아크메이지(썬,콜)": "마법사",
        "아크": "해적(STR)",
        "배틀메이지": "마법사",
        "초보자": "전사",
        "비숍": "마법사",
        "블래스터": "전사",
        "보우마스터": "궁수",
        "카데나": "도적",
        "캐논마스터": "해적(STR)",
        "캡틴": "해적(DEX)",
        "시티즌": "전사",
        "다크나이트": "전사",
        "데몬어벤져": "데벤져",
        "데몬슬레이어": "전사",
        "듀얼블레이더": "도적",
        "은월": "해적(STR)",
        "에반": "마법사",
        "플레임위자드": "마법사",
        "히어로": "전사",
        "호영": "도적",
        "일리움": "마법사",
        "카인": "궁수",
        "카이저": "전사",
        "칼리": "도적",
        "키네시스": "마법사",
        "라라": "마법사",
        "루미너스": "마법사",
        "신궁": "궁수",
        "메카닉": "해적(DEX)",
        "메르세데스": "궁수",
        "미하일": "전사",
        "나이트로드": "도적",
        "나이트워커": "도적",
        "노블레스": "전사",
        "팔라딘": "전사",
        "패스파인더": "궁수",
        "팬텀": "도적",
        "섀도어": "도적",
        "소울마스터": "전사",
        "스트라이커": "해적(STR)",
        "바이퍼": "해적(STR)",
        "와일드헌터": "궁수",
        "윈드브레이커": "궁수",
        "제논": "제논",
        "제로": "전사"
    };    

    const noAddnoStar = ["보조무기", "엠블렘", "훈장", "뱃지"];

    const pendantName = ["정령의 펜던트", "준비된 정령의 펜던트"];

    const SeedRing = ["스킬 사용 시", "일정 시간", "자신의 HP", "자신의 MP", "컨티뉴어스", "공격 시", "The Seed", "일정 확률", "상태 이상"];

    const noAddOp = ["무기", "보조무기", "엠블렘", "어깨장식", "훈장", "뱃지", "기계 심장", "반지1", "반지2", "반지3", "반지4"];

    const EventRing = ["오닉스 링", "벤젼스 링", "코스모스 링", "SS급 마스터 쥬얼링", "결속의 반지", "제로 그라테스링",
                      "어드벤쳐 크리티컬링", "어드벤쳐 다크 크리티컬링", "다크 어드벤쳐 크리티컬링", "어드벤쳐 딥다크 크리티컬링",
                      "카오스 링", "테네브리스 원정대 반지", "글로리온 링 : 슈프림", "어웨이크 링", "이터널 플레임 링", "어비스 헌터스 링"];
    
    const TransformOptionTitle = {
        str: 'STR',
        dex: 'DEX',
        int: 'INT',
        luk: 'LUK',
        max_hp: '최대 HP',
        max_mp: '최대 MP',
        attack_power: '공격력',
        magic_power: '마력',
        armor: '방어력',
        speed: '이동속도',
        jump: '점프력',
        boss_damage: '보스 몬스터 공격 시 데미지',
        ignore_monster_armor: '몬스터 방어율 무시',
        all_stat: '올스탯',
        damage: '데미지',
        equipment_level_decrease: '착용 레벨 감소',
        max_hp_rate: '최대 HP(%)',
        max_mp_rate: '최대 MP(%)',
    };

    const HPMP  = {
        max_hp: '최대 HP',
        max_mp: '최대 MP',
        max_hp_rate: '최대 HP(%)',
        max_mp_rate: '최대 MP(%)',
    }

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

    const [equipmentInfo, setEquipmentInfo] = useState({}); // 캐릭터 장착 장비 정보
    const [selectedEquipmentPreset, setSelectedEquipmentPreset] = useState(""); // 현재 선택된 장비 프리셋 번호
    const [currentEquipmentPreset, setCurrentEquipmentPreset] = useState(""); // 현재 선택된 장비 프리셋의 정보

    const [characterClass, setCharacterClass] = useState(""); // 캐릭터 직업 분류 정보

    const [charAndroid, setCharAndroid] = useState(""); // 캐릭터 안드로이드 정보

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

            // 캐릭터 장착 장비 정보 가져오기
            const getEquipmentInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/item-equipment?ocid=${ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            setEquipmentInfo(getEquipmentInfo.data);
            setCurrentEquipmentPreset(getEquipmentInfo.data[`item_equipment_preset_${getEquipmentInfo.data.preset_no}`]);
            const getCharClass = getEquipmentInfo.data.character_class;
            const getClass = charClass[getCharClass];
            setCharacterClass(getClass);

            // 캐릭터 안드로이드 정보 가져오기
            const getAndroidInfo = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/android-equipment?ocid=${ocid}&date=${searchDate}`, {
                headers: {"x-nxopen-api-key" : NEXON_OPEN_API_KEY}});
            setCharAndroid(getAndroidInfo.data);
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

    const equipmentPresetChange = (presetNo) => { // 장착 장비 프리셋 변경 메서드
        if (equipmentInfo) {
            setCurrentEquipmentPreset(equipmentInfo[`item_equipment_preset_${presetNo}`]);
            setSelectedEquipmentPreset(presetNo);
        }
    };

    function transformPotentialOption(option) { // 잠재옵션명 변환 메서드
        if (option && (option.startsWith("공격 시") || option.startsWith("피격 시") || option.startsWith("피격 후") || option.startsWith("30%"))) {
            return "잡옵";
        }

        if (option && (option.startsWith("최대 HP") || option.startsWith("최대 MP"))) {
            return option.replace("최대 ", "");
        }

        const replacements = [
            { from: "모든 스킬의 재사용 대기시간 : -2초(10초 이하는 10%감소, 5초 미만으로 감소 불가)", to: "쿨감 : -2초" },
            { from: "모든 스킬의 재사용 대기시간 : -1초(10초 이하는 10%감소, 5초 미만으로 감소 불가)", to: "쿨감 : -1초" },
            { from: "모든 스킬의 재사용 대기시간 : -1초(10초 이하는 5%감소, 5초 미만으로 감소 불가)", to: "쿨감 : -1초" },
            { from: "크리티컬 데미지 : +8%", to: "크뎀 : +8%" },
            { from: "크리티컬 데미지 : +3%", to: "크뎀 : +3%" },
            { from: "크리티컬 데미지 : +1%", to: "크뎀 : +1%" },
            { from: "보스 몬스터 공격 시 데미지 : +40%", to: "보공 : +40%" },
            { from: "보스 몬스터 공격 시 데미지 : +35%", to: "보공 : +35%" },
            { from: "보스 몬스터 공격 시 데미지 : +30%", to: "보공 : +30%" },
            { from: "보스 몬스터 공격 시 데미지 : +20%", to: "보공 : +20%" },
            { from: "보스 몬스터 공격 시 데미지 : +18%", to: "보공 : +18%" },
            { from: "보스 몬스터 공격 시 데미지 : +12%", to: "보공 : +12%" },
            { from: "크리티컬 확률 : +12%", to: "크확 : +12%" },
            { from: "크리티컬 확률 : +9%", to: "크확 : +9%" },
            { from: "크리티컬 확률 : +8%", to: "크확 : +8%" },
            { from: "크리티컬 확률 : +6%", to: "크확 : +6%" },
            { from: "크리티컬 확률 : +4%", to: "크확 : +4%" },
            { from: "크리티컬 확률 : +3%", to: "크확 : +3%" },
            { from: "크리티컬 확률 : +2%", to: "크확 : +2%" },
            { from: "크리티컬 확률 : +1%", to: "크확 : +1%" },
            { from: "몬스터 방어율 무시 : +40%", to: "방무 : +40%" },
            { from: "몬스터 방어율 무시 : +35%", to: "방무 : +35%" },
            { from: "몬스터 방어율 무시 : +30%", to: "방무 : +30%" },
            { from: "몬스터 방어율 무시 : +15%", to: "방무 : +15%" },
            { from: "몬스터 방어율 무시 : +5%", to: "방무 : +5%" },
            { from: "몬스터 방어율 무시 : +4%", to: "방무 : +4%" },
            { from: "몬스터 방어율 무시 : +3%", to: "방무 : +3%" },
            { from: "아이템 드롭률 : +20%", to: "아드 : +20%" },
            { from: "메소 획득량 : +20%", to: "메획 : +20%" },
            { from: "캐릭터 기준 9레벨 당 STR : +2", to: "9렙당 STR +2" },
            { from: "캐릭터 기준 9레벨 당 STR : +1", to: "9렙당 STR +1" },
            { from: "캐릭터 기준 9레벨 당 DEX : +2", to: "9렙당 DEX +2" },
            { from: "캐릭터 기준 9레벨 당 DEX : +1", to: "9렙당 DEX +1" },
            { from: "캐릭터 기준 9레벨 당 INT : +2", to: "9렙당 INT +2" },
            { from: "캐릭터 기준 9레벨 당 INT : +1", to: "9렙당 INT +1" },
            { from: "캐릭터 기준 9레벨 당 LUK : +2", to: "9렙당 LUK +2" },
            { from: "캐릭터 기준 9레벨 당 LUK : +1", to: "9렙당 LUK +1" },
            { from: "HP 회복 아이템 및 회복 스킬 효율 : +10%", to: "기타" },
            { from: "HP 회복 아이템 및 회복 스킬 효율 : +20%", to: "기타" },
            { from: "HP 회복 아이템 및 회복 스킬 효율 : +30%", to: "기타" },         
            { from: "HP 회복 아이템 및 회복 스킬 효율 : +40%", to: "기타" },
            { from: "<쓸만한 어드밴스드 블레스> 스킬 사용 가능", to: "기타" },
            { from: "<쓸만한 미스틱 도어> 스킬 사용 가능", to: "기타" },
            { from: "<쓸만한 하이퍼 바디> 스킬 사용 가능", to: "기타" },
            { from: "<쓸만한 컴뱃 오더스> 스킬 사용 가능", to: "기타" },
            { from: "<쓸만한 헤이스트> 스킬 사용 가능", to: "기타" },
            { from: "<쓸만한 윈드 부스터> 스킬 사용 가능", to: "기타" },
            { from: "<쓸만한 샤프 아이즈> 스킬 사용 가능", to: "기타" },
        ];
    
        for (const replacement of replacements) {
            if (option === replacement.from) {
                return replacement.to;
            }
        }
        return option; 
    }

    const getAddOptionByClass = (characterClass, itemAddOption, baseEquipmentLevel, item) => { // 추옵 계산 메서드
        switch (characterClass) {
            case '궁수':
                return (Number(itemAddOption.dex) + Number(itemAddOption.attack_power) * 4 + Number(itemAddOption.all_stat) * 10).toString() + "급";
            case '전사':
                return (Number(itemAddOption.str) + Number(itemAddOption.attack_power) * 4 + Number(itemAddOption.all_stat) * 10).toString() + "급";
            case '도적':
                return (Number(itemAddOption.luk) + Number(itemAddOption.attack_power) * 4 + Number(itemAddOption.all_stat) * 10).toString() + "급";
            case '마법사':
                return (Number(itemAddOption.int) + Number(itemAddOption.magic_power) * 4 + Number(itemAddOption.all_stat) * 10).toString() + "급";
            case '해적(STR)':
                return (Number(itemAddOption.str) + Number(itemAddOption.attack_power) * 4 + Number(itemAddOption.all_stat) * 10).toString() + "급";
            case '해적(DEX)':
                return (Number(itemAddOption.dex) + Number(itemAddOption.attack_power) * 4 + Number(itemAddOption.all_stat) * 10).toString() + "급";
            case '제논':
                return (Math.floor((Number(itemAddOption.str) + Number(itemAddOption.dex) + Number(itemAddOption.luk) + 
                    Number(itemAddOption.attack_power) * 5 + Number(itemAddOption.all_stat) * 20) / 2)).toString() + "급";
            case '데벤져':
                const maxHp = Number(itemAddOption.max_hp);
                let hpGrade = '';
                let levelMultiplier = baseEquipmentLevel.base_equipment_level;
                if (item.item_name.startsWith("에테르넬")) {
                    if (maxHp === 2100) hpGrade = 'HP 5추';
                    else if (maxHp === 2800) hpGrade = 'HP 4추';
                    else if (maxHp === 3500) hpGrade = 'HP 3추';
                    else if (maxHp === 4200) hpGrade = 'HP 2추';
                    else if (maxHp === 4900) hpGrade = 'HP 1추';
                } else {
                    if (maxHp === levelMultiplier * 9) hpGrade = 'HP 5추';
                    else if (maxHp === levelMultiplier * 12) hpGrade = 'HP 4추';
                    else if (maxHp === levelMultiplier * 15) hpGrade = 'HP 3추';
                    else if (maxHp === levelMultiplier * 18) hpGrade = 'HP 2추';
                    else if (maxHp === levelMultiplier * 21) hpGrade = 'HP 1추';
                }
                return hpGrade;
            default:
              return 0;
        }
    };

    const getStarCount = (level) => { // 장비 레벨별 스타포스 최대 수치 계산 메서드
        if (level <= 94) return 5;
        if (level <= 107) return 8;
        if (level <= 117) return 10;
        if (level <= 127) return 15;
        if (level <= 137) return 20;
        return 25;
    };

    const StarForceEA = ({current, color, level}) => { // 스타포스 추가 메서드
        let stars = [];
        let starCount = getStarCount(level);
        for (let i = 1; i <= starCount; i++) {
            stars.push(
                <Star key={i} current={current} index={i} color={color}>
                    ★
                </Star>
            );
            if (i % 15 === 0) {
                stars.push(<LineBreak key={'br' + i} />);
            } else if (i % 5 === 0) {
                stars.push(<Space key={'space1' + i} />);
            }
        }
        return <StarForceContainer>{stars}</StarForceContainer>;
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
              <EquipmentTitle>장비 상세정보</EquipmentTitle>
              <EquipmentPresetBox>
                  <EquipmentPresetButton onClick = {() => {equipmentPresetChange("1")}} selected = {selectedEquipmentPreset === "1"}>프리셋 1</EquipmentPresetButton>
                  <EquipmentPresetButton onClick = {() => {equipmentPresetChange("2")}} selected = {selectedEquipmentPreset === "2"}>프리셋 2</EquipmentPresetButton>
                  <EquipmentPresetButton onClick = {() => {equipmentPresetChange("3")}} selected = {selectedEquipmentPreset === "3"} style = {{border: "none"}}>프리셋 3</EquipmentPresetButton>
              </EquipmentPresetBox>
              <EquipmentBox>
                  {currentEquipmentPreset && currentEquipmentPreset.map((item, index) => {
                      const addOp = getAddOptionByClass(characterClass, item.item_add_option, item.item_base_option, item);

                      const hiddenBox = !(noAddnoStar.some(prefix => item.item_equipment_slot.startsWith(prefix)) ||
                          (item.item_equipment_part === "반지" && item.item_description && SeedRing.some(prefix => item.item_description.startsWith(prefix))) ||
                          pendantName.includes(item.item_name) || EventRing.includes(item.item_name)); 

                      return (
                        <EquipmentInfoBox key = {index}>
                            <HoverItemInfo TopHover = {index >= 12}>
                                {(hiddenBox && item.item_equipment_slot !== "포켓 아이템") || item.item_equipment_part === "블레이드" ?
                                    <StarForceEA current = {parseInt(item.starforce)} 
                                    color = {item.starforce_scroll_flag === '사용' ? '#7FC3FF' : '#FFBB00'} 
                                    level = {item.item_base_option.base_equipment_level}/> : null
                                }
                                {item.item_equipment_slot === "무기" && <SoulName>{item.soul_name.split("소")[0]}</SoulName>}
                                <ItemName>
                                    {item.item_name}&nbsp;
                                    {(hiddenBox && item.item_equipment_slot !== "포켓 아이템") || item.item_equipment_part === "블레이드" ? 
                                        `(+${item.scroll_upgrade})` : null
                                    }
                                </ItemName>
                                {item.potential_option_grade &&
                                    <ItemGrade>
                                        {item.potential_option_grade === "레전드리" && "(레전드리 아이템)"}
                                        {item.potential_option_grade === "유니크" && "(유니크 아이템)"}
                                        {item.potential_option_grade === "에픽" && "(에픽 아이템)"}
                                        {item.potential_option_grade === "레어" && "(레어 아이템)"}
                                    </ItemGrade>
                                }
                                <OutsideBorderBox>
                                    <InsideBorderBox>
                                        <ItemImageContainer grade = {item.potential_option_grade} icon = {item.item_icon}></ItemImageContainer>
                                        <ItemInfoBox>
                                            <AttackPowerIncrease>
                                                <div>공격력 증가량</div>
                                                <div style = {{color: "white", fontSize: "25px", fontFamily: "maple-font"}}>0</div>
                                            </AttackPowerIncrease>
                                            <ItemLevel>■ REQ LEV : {item.item_base_option.base_equipment_level}</ItemLevel>
                                            <ItemStatCondition>
                                                ■ REQ STR : 000<span style ={{marginRight: "27px"}}></span>■ REQ LUK : 000 <br/>
                                                ■ REQ DEX : 000<span style ={{marginRight: "25.8px"}}></span>■ REQ INT : 000
                                            </ItemStatCondition>
                                        </ItemInfoBox>
                                    </InsideBorderBox>
                                    <ItemClassImg></ItemClassImg>
                                </OutsideBorderBox>
                                <BottomBorder></BottomBorder>
                                <ItemDetailInfo>장비분류 : {item.item_equipment_part}</ItemDetailInfo>
                                <ItemDetailInfo>
                                    {Object.entries(item.item_total_option).map(([key, value]) => {
                                        if(parseInt(value) !== 0) {
                                            return <ItemContent key = {key}>
                                                       <Info totalColor = {
                                                           (key in item.item_etc_option && item.item_etc_option[key] !== "0") ||
                                                           (key in item.item_add_option && item.item_add_option[key] !== "0") ||
                                                           (key in item.item_starforce_option && item.item_starforce_option[key] !== "0")}>
                                                               {`${TransformOptionTitle[key]} : +${value}${
                                                               ["boss_damage", "ignore_monster_armor", "all_stat", "damage", "max_hp_rate", "max_mp_rate"].includes(key) ? "%" : ""}`}
                                                       </Info>
                                                       <Info>
                                                           {(key !== 'ignore_monster_armor' && key !== 'damage') && 
                                                           (item.item_equipment_slot && !noAddnoStar.includes(item.item_equipment_slot) || item.item_equipment_part === "블레이드") &&
                                                           !(item.item_equipment_part === "반지" && item.item_description && SeedRing.some(description => item.item_description.includes(description))) &&
                                                           !Object.keys(HPMP).includes(key) && 
                                                               ` (${item.item_base_option[key]}${key === "boss_damage" ? "%" : ""}`
                                                           }
                                                       </Info>
                                                       <Info style = {{color: "#A8A8FC"}}>
                                                           {(key in item.item_etc_option && item.item_etc_option[key] !== "0") && ` +${item.item_etc_option[key]}`}
                                                       </Info>
                                                       <Info style = {{color: "#CAFD01"}}>
                                                           {(key in item.item_add_option && item.item_add_option[key] !== "0") && 
                                                               ` +${item.item_add_option[key]}${["boss_damage", "all_stat", "damage"].includes(key) ? "%" : ""}`
                                                           }
                                                       </Info>
                                                       <Info style = {{color: "#F9C803"}}>
                                                           {(key in item.item_starforce_option && item.item_starforce_option[key] !== "0") && ` +${item.item_starforce_option[key]}`}
                                                       </Info>
                                                       <Info>
                                                           {item.item_equipment_slot && !noAddnoStar.includes(item.item_equipment_slot) &&
                                                           !(item.item_equipment_part === "반지" && item.item_description && 
                                                           SeedRing.some(description => item.item_description.includes(description))) &&
                                                           (key !== 'ignore_monster_armor') && !Object.keys(HPMP).includes(key) &&
                                                               `)`
                                                           }
                                                       </Info>
                                                   </ItemContent>
                                        } return null;
                                    })}
                                </ItemDetailInfo>
                                {item.scroll_upgrade !== "0" && item.scroll_upgradeable_count !== "0" && item.scroll_resilience_count !== "0" && (
                                    <ItemDetailInfo>       
                                        <Info>업그레이드 가능 횟수 : {item.scroll_upgradeable_count}&nbsp;</Info>
                                        <Info style = {{color: "#FFCC02"}}>&nbsp;(복구 가능 횟수 : {item.scroll_resilience_count})</Info>                                                     
                                    </ItemDetailInfo>
                                )}
                                {item.golden_hammer_flag === "적용" && (
                                    <ItemDetailInfo>황금망치 재련 적용</ItemDetailInfo>
                                )}
                                {item.cuttable_count !== "255" && (
                                    <ItemDetailInfo style = {{color: "#FFCC02"}}>가위 사용 가능 횟수 : {item.cuttable_count}회</ItemDetailInfo>
                                )}
                                {item.potential_option_grade === null && item.additional_potential_option_grade === null && (
                                    <EnterBox/>
                                )}
                                {item.potential_option_grade !== null && (
                                    <OutsideBorderBox style = {item.additional_potential_option_grade === null ? {marginBottom: "10px"} : {}}>
                                        <BottomBorder></BottomBorder>
                                        <ItemPotentialTitle>
                                            <GradeImg grade = {item.potential_option_grade}/>
                                            <PG_Title grade = {item.potential_option_grade}>잠재 옵션</PG_Title>
                                        </ItemPotentialTitle>
                                        <PotentialInfoBox>{item.potential_option_1}</PotentialInfoBox>
                                        <PotentialInfoBox>{item.potential_option_2}</PotentialInfoBox>
                                        <PotentialInfoBox>{item.potential_option_3}</PotentialInfoBox>
                                    </OutsideBorderBox>
                                )}
                                {item.additional_potential_option_grade !== null && (
                                <OutsideBorderBox style = {{marginBottom: "10px"}}>
                                    <BottomBorder></BottomBorder>
                                    <ItemPotentialTitle>
                                        <GradeImg grade = {item.additional_potential_option_grade}/>
                                        <PG_Title grade = {item.additional_potential_option_grade}>에디셔널 잠재 옵션</PG_Title>
                                    </ItemPotentialTitle>
                                    <PotentialInfoBox>{item.additional_potential_option_1}</PotentialInfoBox>
                                    <PotentialInfoBox>{item.additional_potential_option_1}</PotentialInfoBox>
                                    <PotentialInfoBox>{item.additional_potential_option_1}</PotentialInfoBox>
                                </OutsideBorderBox>
                                )}
                            </HoverItemInfo>
                            <TopBox>
                                <EquipmentImageBox>
                                    <EquipmentImage EquipmentImg = {item.item_icon}></EquipmentImage>
                                </EquipmentImageBox>
                                <EquipmentDetailInfoBox>
                                    <EquipmentPartTitle>{item.item_equipment_slot}</EquipmentPartTitle>
                                    <EquipmentName hiddenBoxStyle = {hiddenBox}>{item.item_name}</EquipmentName>
                                    {hiddenBox &&                                      
                                        <Equipment_SF_AddOp_Box>
                                            {item.item_equipment_slot !== "포켓 아이템" &&
                                                <StarForce starforceScrollFlag = {item.starforce_scroll_flag}>★ {item.starforce}</StarForce>}
                                            {!noAddOp.some(prefix => item.item_equipment_slot.startsWith(prefix)) && <AddOptionBox>{addOp}</AddOptionBox>}
                                        </Equipment_SF_AddOp_Box>
                                    }
                                </EquipmentDetailInfoBox>
                            </TopBox>
                            <BottomBox>
                                {item.potential_option_grade !== null && item.additional_potential_option_grade !== null ? (
                                    <>
                                        <PotentialBox>
                                            <PotentialTitle>잠재</PotentialTitle>
                                            <PotentialInfo grade = {item.potential_option_grade}>{transformPotentialOption(item.potential_option_1)}</PotentialInfo>
                                            <PotentialInfo grade = {item.potential_option_grade}>{transformPotentialOption(item.potential_option_2)}</PotentialInfo>
                                            <PotentialInfo grade = {item.potential_option_grade}>{transformPotentialOption(item.potential_option_3)}</PotentialInfo>
                                        </PotentialBox>
                                        <PotentialBox>
                                            <PotentialTitle>에디</PotentialTitle>
                                            <PotentialInfo grade = {item.additional_potential_option_grade}>{transformPotentialOption(item.additional_potential_option_1)}</PotentialInfo>
                                            <PotentialInfo grade = {item.additional_potential_option_grade}>{transformPotentialOption(item.additional_potential_option_2)}</PotentialInfo>
                                            <PotentialInfo grade = {item.additional_potential_option_grade}>{transformPotentialOption(item.additional_potential_option_3)}</PotentialInfo>
                                        </PotentialBox>
                                    </>
                                ) : item.potential_option_grade !== null && item.additional_potential_option_grade === null ? (
                                    <>
                                        <PotentialBox>
                                            <PotentialTitle>잠재</PotentialTitle>
                                            <PotentialInfo grade = {item.potential_option_grade}>{transformPotentialOption(item.potential_option_1)}</PotentialInfo>
                                            <PotentialInfo grade = {item.potential_option_grade}>{transformPotentialOption(item.potential_option_2)}</PotentialInfo>
                                            <PotentialInfo grade = {item.potential_option_grade}>{transformPotentialOption(item.potential_option_3)}</PotentialInfo>
                                        </PotentialBox>
                                        <NoAddPotentialBox>에디셔널 잠재능력이 없습니다.</NoAddPotentialBox>
                                    </>
                                ) : (<NoPotentialBox>잠재능력 설정이 불가능한 장비입니다.</NoPotentialBox>)}
                            </BottomBox>
                        </EquipmentInfoBox>
                      );})}
                  <EquipmentInfoBox>
                      <TopBox>
                          <EquipmentImageBox>
                              {equipmentInfo.title && <EquipmentImage EquipmentImg = {equipmentInfo.title.title_icon} />}
                          </EquipmentImageBox>
                          <EquipmentDetailInfoBox>
                              <EquipmentPartTitle>칭호</EquipmentPartTitle>
                              {equipmentInfo.title && <EquipmentName>{equipmentInfo.title.title_name}</EquipmentName>}
                          </EquipmentDetailInfoBox>
                      </TopBox>
                      <BottomBox>
                          <NoPotentialBox>잠재능력 설정이 불가능한 장비입니다.</NoPotentialBox>
                      </BottomBox>
                  </EquipmentInfoBox>
                  <EquipmentInfoBox style = {{marginBottom: "2.5%"}}>
                      <TopBox>
                          <EquipmentImageBox>
                              <EquipmentImage EquipmentImg = {charAndroid.android_icon}></EquipmentImage>
                          </EquipmentImageBox>
                          <EquipmentDetailInfoBox>
                              <EquipmentPartTitle>안드로이드</EquipmentPartTitle>
                              <EquipmentName>{charAndroid.android_name}</EquipmentName>
                          </EquipmentDetailInfoBox>
                      </TopBox>
                      <BottomBox>
                          <NoPotentialBox>잠재능력 설정이 불가능한 장비입니다.</NoPotentialBox>
                      </BottomBox>
                  </EquipmentInfoBox>
              </EquipmentBox>
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
    margin-right: 1%;
    margin-bottom: 2.5%;
    border-radius: 10px;
    border: 2px solid #DDE3E9;
    max-height: 500px;
    overflow-y: auto;
`;

const EquipmentContainer = styled.div` // 최상위 컨테이너 내부의 장비 컨테이너
    display: flex;
    flex-direction: column;
    width: 74%;
    border-radius: 10px;
    border: 2px solid #DDE3E9;
    margin-bottom: 2.5%;
    max-height: 500px;
    overflow-y: auto;
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

const EquipmentTitle = styled.div` // 장비 컨테이너 내부의 최상단 제목 컴포넌트
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

const EquipmentPresetBox = styled.div` // 장비 컨테이너 내부의 장착장비 프리셋 박스
    display: flex;
    width: 100%;
    height: 5vh;
    border-bottom: 2px solid #DDE3E9;
`;

const EquipmentPresetButton = styled.div` // 장착장비 프리셋 박스 내부의 장착장비 프리셋 버튼
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

const EquipmentBox = styled.div` // 장비 컨테이너 내부의 장비 박스
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: #FAFAFA;
`;

const EquipmentInfoBox = styled.div` // 장비 박스 내부의 장비 상세정보 박스
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 15vh;
    border-radius: 5px;
    border: 1px solid #DDE3E9;
    margin-top: 2.5%;
    margin-left: 2.5%;
    background-color: white;
    position: relative;
`;

const TopBox = styled.div` // 장비 상세정보 박스 내부의 상단 박스
    display: flex;
    width: 100%;
    height: 9vh;
    border-bottom: 1px solid #DDE3E9;
`;

const EquipmentImageBox = styled.div` // 상단 박스 내부의 장비 이미지 박스
    width: 30%;
    height: 9vh;
    border-right: 1px solid #DDE3E9;
    margin-bottom: ${props => props.marginBottom || '0'};
`;

const EquipmentImage = styled.div` // 장비 이미지 박스 내부의 장비 이미지
    width: 80%;
    height: 80%;
    margin-top: 10%;
    margin-left: 10%;
    background-image: url(${props => props.EquipmentImg});
    background-size: contain;
    background-repeat: no-repeat;
`;

const EquipmentDetailInfoBox = styled.div` // 상단 박스 내부의 장비 상세정보 박스
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 9vh;
`;

const EquipmentPartTitle = styled.div` // 장비 상세정보 박스 내부의 장비 부위 이름
    width: 100%;
    height: 3vh;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    line-height: 3vh;
    border-bottom: 1px solid #DDE3E9;
    background-color: #ECEFF7;
`;

const EquipmentName = styled.div` // 장비 상세정보 박스 내부의 장비명
    width: 100%;
    height: 3vh;
    font-size: 12.5px;
    text-align: center;
    line-height: 3vh;
    border-bottom: 1px solid #DDE3E9;

    ${props => !props.hiddenBoxStyle && `
        height: 6vh;
        line-height: 6vh;
        border: none;
    `}
`;

const Equipment_SF_AddOp_Box = styled.div` // 장비 상세정보 박스 내부의 스타포스&추가옵션 박스
    display: flex;
    width: 100%;
    height: 3vh;
`;

const StarForce = styled.div` // 스타포스&추가옵션 박스 내부의 스타포스 정보
    width: 25%;
    height: 2vh;
    border-radius: 3px;
    background-color: ${props => props.starforceScrollFlag === '사용' ? '#F0F3F5' : '#F5EDE1'};
    color: ${props => props.starforceScrollFlag === '사용' ? '#7FC3FF' : '#F6A730'};
    font-size: 12.5px;
    font-weight: bold;
    text-align: center;
    line-height: 2vh;
    margin-top: 0.4vh;
    margin-left: 15%;
`;

const BottomBox = styled.div` // 장비 상세정보 박스 내부의 하단 박스
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 6vh;
`;

const PotentialBox = styled.div` // 하단 박스 내부의 잠재능력 박스
    display: flex;
    width: 100%;
    height: 3vh;
    border-bottom: 1px solid #DDE3E9;
`;

const PotentialTitle = styled.div` // 잠재능력 박스 내부의 제목 컴포넌트
    width: 20%;
    height: 3vh;
    font-size: 12.5px;
    font-weight: bold;
    text-align: center;
    line-height: 3vh;
    background-color: #ECEFF7;
    border-right: 1px solid #DDE3E9;
`;

const PotentialInfo = styled.div` // 잠재능력 박스 내부의 잠재능력 정보
    width: 25%;
    height: 3vh;
    font-size: 10px;
    line-height: 3vh;
    margin-left: 1%;

    color: ${props => {
        switch (props.grade) {
            case "레전드리":
                return "#5CB85C";
            case "유니크":
                return "#F6A730";
            case "에픽":
                return "#6D62A1";
            case "레어":
                return "#5393CA";
            default:
                return "transparent";
        }
    }};
`;

const AddOptionBox = styled.div` // 스타포스&추가옵션 박스 내부의 추옵 정보
    width: 25%;
    height: 2vh;
    border-radius: 3px;
    background-color: #F5F5F5;
    color: #666A7A;
    font-size: 12.5px;
    font-weight: bold;
    text-align: center;
    line-height: 2vh;
    margin-top: 0.4vh;
    margin-left: 15%;
`;

const NoAddPotentialBox = styled.div` // 에디셔널잠재능력이 없는 경우 렌더링 되는 컴포넌트
    width: 100%;
    height: 3vh;
    font-size: 10px;
    text-align: center;
    line-height: 3vh;
    background-color: #ECEFF7;
`;

const NoPotentialBox = styled.div` // 윗잠, 에디 둘 다 없는 경우 렌더링 되는 컴포넌트
    width: 100%;
    height: 6vh;
    background-color: #ECEFF7;
    border-radius: 0px 0px 5px 5px;
    border-bottom: 1px solid #DDE3E9;
    font-size: 10px;
    text-align: center;
    line-height: 6vh;
`;

const HoverItemInfo = styled.div` // 아이템 호버 최상위 컨테이너
    display: none;
    position: absolute;
    z-index: 100;
    top: ${props => props.TopHover ? 'auto' : '100%'}; 
    bottom: ${props => props.TopHover ? '100%' : 'auto'}; 
    color: white;
    background-color: #2B2B2B;
    border-radius: 5px;
    box-shadow: 0 0 0 2px #fff, 0 0 0 2px #000;
    width: 100%;

    ${EquipmentInfoBox}:hover & {
        display: block;
    }
`;

const StarForceContainer = styled.div` // 아이템 호버 컨테이너 내부의 스타포스 컨테이너 
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 5vh;
    white-space: pre;
    justify-content: center;
    font-size: 12.5px;
    color: #667788;
    text-shadow: -0.5px 0 white, 0 0.5px white, 0.5px 0 white, 0 -0.5px white;
    text-align: center;
    margin-top: 5px;
`;

const Star = styled.span` // 스타포스 별 아이콘
    color: ${({ current, index, color }) => (current >= index ? color : '#667788')};
`;

const Space = styled.span` // 스타포스 5개마다 공백
    width: 5px;
    display: inline-block;
`;

const LineBreak = styled.div` // 스타포스 15개 이 후 개행
    flex-basis: 100%;
    height: 0;
`;

const SoulName = styled.div` // 아이템 호버 컨테이너 내부의 무기 소울명
    width: 100%;
    margin-top: 5px;
    text-align: center;
    font-size: 15px;
    color: #CCFF00;
`;

const ItemName = styled.div` // 아이템 호버 컨테이너 내부의 장비명 
    width: 100%;
    margin-top: 5px;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    color: #F43F5E;
`;

const ItemGrade = styled.div` // 아이템 호버 컨테이너 내부의 잠재능력 등급명
    width: 100%;
    margin-top: 5px;
    text-align: center;
    font-size: 12.5px;
`;

const OutsideBorderBox = styled.div` // 아이템 호버 컨테이너 내부의 바깥테두리 박스
    width: 100%;
    margin-top: 5px;
    border-top: 1px dashed #000000;
`;

const InsideBorderBox = styled.div` // 바깥테두리 박스 내부의 안쪽테두리 박스
    display: flex;
    width: 100%;
    font-size: 12.5px;
    border-top: 1px dashed #4D4D4D;
`;

const ItemImageContainer = styled.div` // 안쪽테두리 박스 내부의 이미지 컨테이너 
    width: 90px;
    height: 90px;
    margin-top: 5px;
    margin-left: 10px;
    background-size: 85% 85%, 60% 60%, contain, 90% 90%;
    background-position: 2.5px 7px, 12.5px 20px, left, left;
    background-repeat: no-repeat;

    background-image: 
        url(${Light_Effect}),
        url(${props => props.icon}),
        url(${props => {
            switch (props.grade) {
            case '레전드리':
                return Legendary_Cover;
            case '유니크':
                return Unique_Cover;
            case '에픽':
                return Epic_Cover;
            case '레어':
                return Rare_Cover;
            default:
                return 'none';
            }
        }}), url(${Background_Cover});
`;

const ItemInfoBox = styled.div` // 안쪽테두리 박스 내부의 아이템 기타 정보박스
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-top: 10px;
`;

const AttackPowerIncrease = styled.div` // 기타 정보박스 내부의 공격력 증가량 박스 
    width: 100%;
    text-align: right;
    color: #999999;
    font-size: 12px;
`;

const ItemLevel = styled.div` // 기타 정보박스 내부의 장비아이템 장착레벨
    width: 100%;
    margin-bottom: 5px;
    color: #FFCC00;
    font-size: 9px;
`;

const ItemStatCondition = styled.div` // 기타 정보박스 내부의 장비아이템 장착 스탯조건
    width: 100%;
    text-align: left;
    color: #777777;
    font-size: 9px;
    line-height: 1;
`;

const ItemClassImg = styled.div` // 바깥테두리 박스 내부의 장비아이템 장착 직업조건
    width: 99%;
    height: 50px;
    margin-left: 1%;
    margin-bottom: 5px;
    background-image: url(${Item_Class});
    background-size: cover;
`;

const BottomBorder = styled.div` // 바깥테두리 박스 아래의 추가 구분선
    width: 100%;
    margin-bottom: 5px;
    border-top: 1px dashed #4D4D4D;
`;

const ItemDetailInfo = styled.div` // 추가 구분선 아래의 장비 상세능력 정보 컴포넌트
    width: 100%;
    margin-left: 10px;
    font-size: 12px;
`;

const ItemContent = styled.div` // 장비 상세능력 정보 컴포넌트 내부의 장비 상세능력치 박스
    width: 100%;
`;

const Info = styled.span` // 장비 상세능력치 박스 내부의 장비 능력치 정보
    width: 100%;
    color: ${props => props.totalColor ? '#5EE9E9' : 'white'};
`;

const ItemPotentialTitle = styled.div` // 장비 잠재능력 제목 박스 
    display: flex;
    width: 100%;
    height: 17.5px;
`;

const GradeImg = styled.div` // 잠재능력 등급 이미지
    width: 15px;
    height: 15px;
    margin-left: 10px;
    background-size: cover;

    background-image: url(${props => {
        switch (props.grade) {
            case '레전드리':
                return Legendary_Grade;
            case '유니크':
                return Unique_Grade;
            case '에픽':
                return Epic_Grade;
            case '레어':
                return Rare_Grade;
            default:
                return null;
        }
    }});
`;

const PG_Title = styled.div` // 잠재 능력 제목 컴포넌트
    font-size: 12px;
    margin-left: 2.5px;
    padding-bottom: 1px;

    color: ${props => {
        switch (props.grade) {
            case "레전드리":
                return "#BFEE03";
            case "유니크":
                return "#FFCC02";
            case "에픽":
                return "#AAAAFF";
            case "레어":
                return "#64FFFF";
            default:
                return "transparent";
        }
    }};
`;

const PotentialInfoBox = styled.div` // 잠재 능력 제목 컴포넌트 아래의 잠재능력 정보
    width: 100%;
    margin-left: 10px;
    font-size: 12.5px;
`;

const EnterBox = styled.div` // 공용 밑 여백 박스
    width: 100%;
    margin-bottom: 10px;
`;
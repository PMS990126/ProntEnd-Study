import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import axios from 'axios';

import Hero from '../picture/class/Hero.png';
import Paladin from '../picture/class/Paladin.png';
import Dark_knight from '../picture/class/Dark_Knight.png';
import Soul_master from '../picture/class/Soul_Master.png';
import Mihile from '../picture/class/Mihile.png';
import Blaster from '../picture/class/Blaster.png';
import Demon_slayer from '../picture/class/Demon_Slayer.png';
import Demon_avenger from '../picture/class/Demon_Avenger.png';
import Aran from '../picture/class/Aran.png';
import Kaiser from '../picture/class/Kaiser.png';
import Adel from '../picture/class/Adel.png';
import Zero from '../picture/class/Zero.png';

import ArchMage_Fire_Poison from '../picture/class/Arch_Mage(Fire,Poison).png';
import ArchMage_Ice_Lightning from '../picture/class/Arch_Mage(Ice,Lightning).png';
import Bishop from '../picture/class/Bishop.png';
import Flame_wizard from '../picture/class/Flame_Wizard.png';
import Battle_mage from '../picture/class/Battle_Mage.png';
import Evan from '../picture/class/Evan.png';
import Luminous from '../picture/class/Luminous.png';
import Illium from '../picture/class/Illium.png';
import Kinesis from '../picture/class/Kinesis.png';
import Lala from '../picture/class/Lala.png';

import Bow_master from '../picture/class/Bow_Master.png';
import Marksman from '../picture/class/MarksMan.png';
import Path_finder from '../picture/class/Path_Finder.png';
import Wind_breaker from '../picture/class/Wind_Breaker.png';
import Wild_hunter from '../picture/class/Wild_Hunter.png';
import Mercedes from '../picture/class/Mercedes.png';
import Kain from '../picture/class/Kain.png';

import Night_lord from '../picture/class/Night_Lord.png';
import Shadower from '../picture/class/Shadower.png';
import Dual_blade from '../picture/class/Dual_Blade.png';
import Night_worker from '../picture/class/Night_Walker.png';
import Xenon from '../picture/class/Xenon.png';
import Phantom from '../picture/class/Phantom.png';
import Cadena from '../picture/class/Cadena.png';
import Khali from '../picture/class/Khali.png';
import Ho_young from '../picture/class/Hoyoung.png';

import Viper from '../picture/class/Viper.png';
import Captain from '../picture/class/Captain.png';
import Cannon_shooter from '../picture/class/Cannon_Shooter.png';
import Striker from '../picture/class/Striker.png';
import Mechanic from '../picture/class/Mechanic.png';
import Eunwol from '../picture/class/Eunwol.png';
import Angelic_buster from '../picture/class/Angelic_Buster.png';
import Ark from '../picture/class/Ark.png';

import Beginner from '../picture/class/Beginner.png';

function formatNumber(num) {
    let strNum = String(num);
    let billion = '';
    let million = '';
    let thousand = '';

    if (strNum.length > 8) {
        billion = strNum.slice(0, strNum.length - 8);
        million = strNum.slice(strNum.length - 8, strNum.length - 4);
        thousand = strNum.slice(strNum.length - 4);
        return billion + '억' + million + '만' + thousand;
    } else if (strNum.length > 4) {
        million = strNum.slice(0, strNum.length - 4);
        thousand = strNum.slice(strNum.length - 4);
        return million + '만' + thousand;
    } else {
        return strNum;
    }
}

function commaNumber(numString) {
    let num = parseInt(numString, 10);
    return num.toLocaleString('ko-KR');
}

const className = {
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
    '아크메이지(불,독)': ArchMage_Fire_Poison,
    '아크메이지(썬,콜)': ArchMage_Ice_Lightning,
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

export default function StatEquip() {
    const maple_api = process.env.REACT_APP_NEXON_OPEN_API1;

    //스탯정보 저장 변수
    const [cp, setCp] = useState(null); //전투력
    const [minStat, setMinStat] = useState(null); //최소 스공
    const [maxStat, setMaxStat] = useState(null); //최대 스공
    const [hp, setHp] = useState(null);
    const [mp, setMp] = useState(null);
    const [str, setStr] = useState(null);
    const [dex, setDex] = useState(null);
    const [int, setInt] = useState(null);
    const [luk, setLuk] = useState(null);
    const [demage, setDemage] = useState(null); //데미지
    const [lastDemage, setLastDemage] = useState(null); //최종뎀
    const [normalDemage, setNormaldemage] = useState(null); //일반 몬스터 데미지
    const [bossDemage, setBossDemage] = useState(null); //보뎀
    const [ignoreGuard, setIgnoreGuard] = useState(null); //방무
    const [critical, setCritical] = useState(null); //크확
    const [criticalDemage, setCriticalDemage] = useState(null); //크뎀
    const [debuff, setDebuff] = useState(null); //상태이상내성
    const [stance, setStance] = useState(null); //스탠스
    const [defense, setDefense] = useState(null); //방어력
    const [speed, setSpeed] = useState(null); //이동속도
    const [jump, setJump] = useState(null); //점프력
    const [starforce, setStarforce] = useState(null); //스타포스
    const [arcane, setArcane] = useState(null); //아케인포스
    const [authentic, setAuthentic] = useState(null); //어센틱포스
    const [apHp, setApHp] = useState(null); //AP 배분 HP
    const [apMp, setApMp] = useState(null); //AP 배분 MP
    const [apStr, setApStr] = useState(null); //AP 배분 STR
    const [apDex, setApDex] = useState(null); //AP 배분 DEX
    const [apInt, setApInt] = useState(null); //AP 배분 INT
    const [apLuk, setApLuk] = useState(null); //AP 배분 LUK
    const [itemDrop, setItemDrop] = useState(null); //아이템드롭률
    const [mesoDrop, setMesoDrop] = useState(null); //메소 획득량
    const [buffTime, setBuffTime] = useState(null); //버프 지속시간
    const [attackSpeed, setAttackSpeed] = useState(null); //공격속도
    const [coolTimesecond, setCoolTimesecond] = useState(null); //재사용 대기시간 감소(초)
    const [coolTimepercent, setCoolTimepercent] = useState(null); //재사용 대기시간 감소(%)
    const [coolTimeNone, setCoolTimeNone] = useState(null); //재사용 대기시간 미적용
    const [attributeIgnore, setAttributeIgnore] = useState(null); // 속성 내성 무시
    const [addDemage, setAddDemage] = useState(null); //상태이상 추가 데미지
    const [addExp, setAddExp] = useState(null); //추가 경험치 획득
    const [attackPower, setAttackPower] = useState(null); //공격력
    const [magicPower, setMagicPower] = useState(null); //마력
    const [incDuration, setIncDuration] = useState(null); //소환수 지속시간 증가
    const [weaponSkills, setWeaponSkills] = useState(null); //무기 숙련도
    const [characterClass, setCharacterClass] = useState(null);
    const [remainAp, setRemainAp] = useState(null);

    //어빌리티 정보 저장 변수
    const [preset1Abilities, setPreset1Abilities] = useState(null);
    const [preset2Abilities, setPreset2Abilities] = useState(null);
    const [preset3Abilities, setPreset3Abilities] = useState(null);
    const [selectAbPreset, setSelectAbPreset] = useState(0);
    const abPresets = [preset1Abilities, preset2Abilities, preset3Abilities]; // 프리셋 배열

    const handleAbPresetClick = (presetIndex) => {
        setSelectAbPreset(presetIndex);
    };

    //하이퍼스탯
    const [preset1Hyper, setPreset1Hyper] = useState(null);
    const [preset2Hyper, setPreset2Hyper] = useState(null);
    const [preset3Hyper, setPreset3Hyper] = useState(null);
    const [selectHyperPreset, setSelectHyperPreset] = useState(0);
    const hyperPresets = [preset1Hyper, preset2Hyper, preset3Hyper]; // 프리셋 배열

    const handleHyperPresetClick = (presetIndex) => {
        setSelectHyperPreset(presetIndex);
    };

    //장비 스탯
    const [preset1Equip, setPreset1Equip] = useState([]);
    const [preset2Equip, setPreset2Equip] = useState([]);
    const [preset3Equip, setPreset3Equip] = useState([]);
    const [selectEquipPreset, setSelectEquipPreset] = useState(0);
    const EquipPresets = [preset1Equip, preset2Equip, preset3Equip]; // 프리셋 배열

    const handleEquipPresetClick = (presetIndex) => {
        setSelectEquipPreset(presetIndex);
    };

    const today = new Date();
    const yesterday = new Date(today.getTime());
    yesterday.setDate(yesterday.getDate() - 2);
    const year = yesterday.getFullYear();
    const month = ('0' + (yesterday.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
    const date = ('0' + yesterday.getDate()).slice(-2); // 날짜를 2자리로 만듭니다.
    const usingday = `${year}-${month}-${date}`;

    let currentPath = window.location.pathname;
    let parts = currentPath.split('/');
    let ocid = parts[2]; //URL의 파리미터에서 ocid(식별자)를 가져옴

    useEffect(() => {
        fetchUserData();
    });

    const fetchUserData = async () => {
        try {
            const getCharacterStat = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}&date=${usingday}`, {
                headers: { 'x-nxopen-api-key': maple_api },
            });
            const { final_stat, character_class } = getCharacterStat.data;
            setCharacterClass(character_class);
            final_stat.forEach((stat) => {
                switch (stat.stat_name) {
                    case '전투력':
                        setCp(stat.stat_value);
                        break;
                    case '최소 스탯공격력':
                        setMinStat(stat.stat_value);
                        break;
                    case '최대 스탯공격력':
                        setMaxStat(stat.stat_value);
                        break;
                    case '데미지':
                        setDemage(stat.stat_value);
                        break;
                    case '보스 몬스터 데미지':
                        setBossDemage(stat.stat_value);
                        break;
                    case '최종 데미지':
                        setLastDemage(stat.stat_value);
                        break;
                    case '일반 몬스터 데미지':
                        setNormaldemage(stat.stat_value);
                        break;
                    case '방어율 무시':
                        setIgnoreGuard(stat.stat_value);
                        break;
                    case '크리티컬 확률':
                        setCritical(stat.stat_value);
                        break;
                    case '크리티컬 데미지':
                        setCriticalDemage(stat.stat_value);
                        break;
                    case '상태이상 내성':
                        setDebuff(stat.stat_value);
                        break;
                    case '스탠스':
                        setStance(stat.stat_value);
                        break;
                    case '방어력':
                        setDefense(stat.stat_value);
                        break;
                    case '이동속도':
                        setSpeed(stat.stat_value);
                        break;
                    case 'HP':
                        setHp(stat.stat_value);
                        break;
                    case 'MP':
                        setMp(stat.stat_value);
                        break;
                    case 'STR':
                        setStr(stat.stat_value);
                        break;
                    case 'DEX':
                        setDex(stat.stat_value);
                        break;
                    case 'INT':
                        setInt(stat.stat_value);
                        break;
                    case 'LUK':
                        setLuk(stat.stat_value);
                        break;
                    case '점프력':
                        setJump(stat.stat_value);
                        break;
                    case '스타포스':
                        setStarforce(stat.stat_value);
                        break;
                    case '아케인포스':
                        setArcane(stat.stat_value);
                        break;
                    case '어센틱포스':
                        setAuthentic(stat.stat_value);
                        break;
                    case 'AP 배분 HP':
                        setApHp(stat.stat_value);
                        break;
                    case 'AP 배분 MP':
                        setApMp(stat.stat_value);
                        break;
                    case 'AP 배분 STR':
                        setApStr(stat.stat_value);
                        break;
                    case 'AP 배분 DEX':
                        setApDex(stat.stat_value);
                        break;
                    case 'AP 배분 INT':
                        setApInt(stat.stat_value);
                        break;
                    case 'AP 배분 LUK':
                        setApLuk(stat.stat_value);
                        break;
                    case '아이템 드롭률':
                        setItemDrop(stat.stat_value);
                        break;
                    case '메소 획득량':
                        setMesoDrop(stat.stat_value);
                        break;
                    case '버프 지속시간':
                        setBuffTime(stat.stat_value);
                        break;
                    case '공격 속도':
                        setAttackSpeed(stat.stat_value);
                        break;
                    case '재사용 대기시간 감소 (초)':
                        setCoolTimesecond(stat.stat_value);
                        break;
                    case '재사용 대기시간 감소 (%)':
                        setCoolTimepercent(stat.stat_value);
                        break;
                    case '재사용 대기시간 미적용':
                        setCoolTimeNone(stat.stat_value);
                        break;
                    case '속성 내성 무시':
                        setAttributeIgnore(stat.stat_value);
                        break;
                    case '상태이상 추가 데미지':
                        setAddDemage(stat.stat_value);
                        break;
                    case '무기 숙련도':
                        setWeaponSkills(stat.stat_value);
                        break;
                    case '추가 경험치 획득':
                        setAddExp(stat.stat_value);
                        break;
                    case '공격력':
                        setAttackPower(stat.stat_value);
                        break;
                    case '마력':
                        setMagicPower(stat.stat_value);
                        break;
                    case '소환수 지속시간 증가':
                        setIncDuration(stat.stat_value);
                        break;
                    default:
                        break;
                }
            });

            //어빌리티 정보 불러오기
            const getCharacterAbility = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/ability?ocid=${ocid}&date=${usingday}`, {
                headers: { 'x-nxopen-api-key': maple_api },
            });

            // 응답 데이터에서 어빌리티 프리셋 정보 추출
            const { ability_preset_1, ability_preset_2, ability_preset_3 } = getCharacterAbility.data;

            // 각 프리셋의 ability_info 배열에서 필요한 정보 추출
            setPreset1Abilities(
                ability_preset_1.ability_info.map(({ ability_no, ability_grade, ability_value }) => {
                    return { ability_no, ability_grade, ability_value };
                })
            );

            setPreset2Abilities(
                ability_preset_2.ability_info.map(({ ability_no, ability_grade, ability_value }) => {
                    return { ability_no, ability_grade, ability_value };
                })
            );

            setPreset3Abilities(
                ability_preset_3.ability_info.map(({ ability_no, ability_grade, ability_value }) => {
                    return { ability_no, ability_grade, ability_value };
                })
            );

            //하이퍼스탯 불러오기
            const getHyperStat = await axios.get(
                `https://open.api.nexon.com/maplestory/v1/character/hyper-stat?ocid=${ocid}&date=${usingday}

            `,
                {
                    headers: { 'x-nxopen-api-key': maple_api },
                }
            );
            const { hyper_stat_preset_1, hyper_stat_preset_2, hyper_stat_preset_3 } = getHyperStat.data;

            setPreset1Hyper(
                hyper_stat_preset_1.map(({ stat_type, stat_point, stat_level, stat_increase }) => {
                    return { stat_type, stat_point, stat_level, stat_increase };
                })
            );

            setPreset2Hyper(
                hyper_stat_preset_2.map(({ stat_type, stat_point, stat_level, stat_increase }) => {
                    return { stat_type, stat_point, stat_level, stat_increase };
                })
            );

            setPreset3Hyper(
                hyper_stat_preset_3.map(({ stat_type, stat_point, stat_level, stat_increase }) => {
                    return { stat_type, stat_point, stat_level, stat_increase };
                })
            );
            // 장비 불러오기
            const getEquip = await axios.get(`https://open.api.nexon.com/maplestory/v1/character/item-equipment?ocid=${ocid}&date=${usingday}`, {
                headers: { 'x-nxopen-api-key': maple_api },
            });

            const data = getEquip.data;
            const etcOptions = [
                '공격 시 3% 확률로 47의 HP 회복',
                '피격 시 30% 확률로 51의 데미지 무시',
                '피격 시 20% 확률로 38의 데미지 무시',
                '공격 시 3% 확률로 47의 MP 회복',
                '피격 시 10% 확률로 데미지의 20% 무시',
                '피격 시 10% 확률로 데미지의 40% 무시',
                '피격 시 5% 확률로 데미지의 20% 무시',
                '피격 시 5% 확률로 데미지의 40% 무시',
                '최대 MP: +12%',
                '방어력: +12%',
                '<쓸만한 어드밴스드 블레스> 스킬 사용 가능',
                '최대 MP: +9%',
                '방어력: +9%',
                'HP 회복 아이템 및 회복 스킬 효율: +30%',
                '<쓸만한 미스틱 도어> 스킬 사용 가능',
                '피격 후 무적시간: +3초',
                '피격 시 4% 확률로 7초간 무적',
                '피격 후 무적시간: +2초',
                '피격 시 2% 확률로 7초간 무적',
                '30% 확률로 받은 피해의 50%를 반사',
                '30% 확률로 받은 피해의 70%를 반사',
                '<쓸만한 하이퍼 바디> 스킬 사용 가능',
                '<쓸만한 컴뱃 오더스> 스킬 사용 가능',
                '<쓸만한 헤이스트> 스킬 사용 가능',
                '<쓸만한 윈드 부스터> 스킬 사용 가능',
                '모든 스킬의 MP 소모: -15%',
                '모든 스킬의 MP 소모: -30%',
                '최대 MP: +10%',
                '최대 MP: +7%',
                '공격 시 15% 확률로 95의 HP 회복',
                '공격 시 15% 확률로 95의 MP 회복',
                '최대 MP: +300',
                '방어력: +200',
                '최대 MP: +240',
                '방어력: +150',
                'HP 회복 아이템 및 회복 스킬 효율: +20%',
                'HP 회복 아이템 및 회복 스킬 효율 : +30%',
            ];
            const replaceText = (equipments) => {
                return equipments.map((equip) => {
                    let newEquip = { ...equip };
                    ['potential_option_1', 'potential_option_2', 'potential_option_3', 'additional_potential_option_1', 'additional_potential_option_2', 'additional_potential_option_3'].forEach(
                        (option) => {
                            if (newEquip[option] && newEquip[option].includes('보스 몬스터 공격 시 데미지')) {
                                newEquip[option] = newEquip[option].replace('보스 몬스터 공격 시 데미지', '보공');
                            }
                            if (newEquip[option] && newEquip[option].includes('크리티컬 확률')) {
                                newEquip[option] = newEquip[option].replace('크리티컬 확률', '크확');
                            }
                            if (newEquip[option] && newEquip[option].includes('크리티컬 데미지')) {
                                newEquip[option] = newEquip[option].replace('크리티컬 데미지', '크뎀');
                            }
                            if (newEquip[option] && newEquip[option].includes('아이템 드롭률')) {
                                newEquip[option] = newEquip[option].replace('아이템 드롭률', '아획');
                            }
                            if (newEquip[option] && newEquip[option].includes('메소 획득량')) {
                                newEquip[option] = newEquip[option].replace('메소 획득량', '메획');
                            }
                            if (newEquip[option] && newEquip[option].includes('최대 HP')) {
                                newEquip[option] = newEquip[option].replace('최대 HP', 'HP');
                            }
                            if (newEquip[option] && newEquip[option].includes('최대 MP')) {
                                newEquip[option] = newEquip[option].replace('최대 MP', 'MP');
                            }
                            if (newEquip[option] && newEquip[option].includes('모든 스킬의 재사용 대기시간')) {
                                newEquip[option] = newEquip[option].replace('모든 스킬의 재사용 대기시간', '쿨감');
                            }
                            if (newEquip[option] && newEquip[option].includes('(10초 이하는 10%감소, 5초 미만으로 감소 불가)')) {
                                newEquip[option] = newEquip[option].replace('(10초 이하는 10%감소, 5초 미만으로 감소 불가)', '');
                            }
                            if (newEquip[option] && newEquip[option].includes('(10초 이하는 5%감소, 5초 미만으로 감소 불가)')) {
                                newEquip[option] = newEquip[option].replace('(10초 이하는 5%감소, 5초 미만으로 감소 불가)', '');
                            }
                            if (newEquip[option] && newEquip[option].includes('캐릭터 기준 9레벨 당 STR :')) {
                                newEquip[option] = newEquip[option].replace('캐릭터 기준 9레벨 당 STR :', '9렙당STR');
                            }
                            if (newEquip[option] && newEquip[option].includes('캐릭터 기준 9레벨 당 DEX :')) {
                                newEquip[option] = newEquip[option].replace('캐릭터 기준 9레벨 당 DEX :', '9렙당DEX');
                            }
                            if (newEquip[option] && newEquip[option].includes('캐릭터 기준 9레벨 당 INT :')) {
                                newEquip[option] = newEquip[option].replace('캐릭터 기준 9레벨 당 INT :', '9렙당INT');
                            }
                            if (newEquip[option] && newEquip[option].includes('캐릭터 기준 9레벨 당 LUK :')) {
                                newEquip[option] = newEquip[option].replace('캐릭터 기준 9레벨 당 LUK :', '9렙당LUK');
                            }
                            if (newEquip[option] && etcOptions.includes(newEquip[option])) {
                                newEquip[option] = '기타';
                            }
                        }
                    );
                    return newEquip;
                });
            };

            let presetEquipments = [replaceText(data.item_equipment_preset_1), replaceText(data.item_equipment_preset_2), replaceText(data.item_equipment_preset_3)];

            setPreset1Equip(presetEquipments[0]);
            setPreset2Equip(presetEquipments[1]);
            setPreset3Equip(presetEquipments[2]);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <Container>
            <LeftContainer>
                <TitleText>스탯</TitleText>
                <MergeContainer>
                    <BgImgContainer class={characterClass} />
                    <CPContainer>
                        <Cpname>전투력</Cpname> <Cpinfo> {formatNumber(cp)} </Cpinfo>
                    </CPContainer>
                </MergeContainer>

                <StatContainer>
                    <Stname>스탯 공격력</Stname>
                    <Stinfo>
                        {' '}
                        {commaNumber(minStat)} ~ {commaNumber(maxStat)}
                    </Stinfo>
                </StatContainer>
                <StatBorderContainer>
                    <DetailedStatContainer>
                        <Dstatname>HP</Dstatname>
                        <Dstatinfo>{commaNumber(hp)}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>MP</Dstatname>
                        <Dstatinfo>{commaNumber(mp)}</Dstatinfo>
                    </DetailedStatContainer>{' '}
                    <DetailedStatContainer>
                        <Dstatname>STR</Dstatname>
                        <Dstatinfo>{commaNumber(str)}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>DEX</Dstatname>
                        <Dstatinfo>{commaNumber(dex)}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>INT</Dstatname>
                        <Dstatinfo>{commaNumber(int)}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>LUK</Dstatname>
                        <Dstatinfo>{commaNumber(luk)}</Dstatinfo>
                    </DetailedStatContainer>
                </StatBorderContainer>
                <StatBorderContainer>
                    <DetailedStatContainer>
                        <Dstatname>데미지</Dstatname>
                        <Dstatinfo>{demage}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>최종 데미지</Dstatname>
                        <Dstatinfo>{lastDemage}%</Dstatinfo>
                    </DetailedStatContainer>{' '}
                    <DetailedStatContainer>
                        <Dstatname>보스 몬스터 데미지</Dstatname>
                        <Dstatinfo>{bossDemage}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>일반 몬스터 데미지</Dstatname>
                        <Dstatinfo>{normalDemage}%</Dstatinfo>
                    </DetailedStatContainer>
                </StatBorderContainer>
                <StatBorderContainer>
                    <DetailedStatContainer>
                        <Dstatname>공격력</Dstatname>
                        <Dstatinfo>{commaNumber(attackPower)}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>마력</Dstatname>
                        <Dstatinfo>{commaNumber(magicPower)}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>방어율 무시</Dstatname>
                        <Dstatinfo>{ignoreGuard}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>크리티컬 확률</Dstatname>
                        <Dstatinfo>{critical}%</Dstatinfo>
                    </DetailedStatContainer>{' '}
                    <DetailedStatContainer>
                        <Dstatname>크리티컬 데미지</Dstatname>
                        <Dstatinfo>{criticalDemage}%</Dstatinfo>
                    </DetailedStatContainer>
                </StatBorderContainer>
                <StatBorderContainer>
                    <DetailedStatContainer>
                        <Dstatname>스타포스</Dstatname>
                        <Dstatinfo> {commaNumber(starforce)}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>아케인포스</Dstatname>
                        <Dstatinfo> {commaNumber(arcane)}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>어센틱포스</Dstatname>
                        <Dstatinfo> {commaNumber(authentic)}</Dstatinfo>
                    </DetailedStatContainer>
                </StatBorderContainer>
                <StatBorderContainer>
                    <DetailedStatContainer>
                        <Dstatname>
                            재사용 대기시간 감소{'('}초{')'}
                        </Dstatname>
                        <Dstatinfo> {coolTimesecond}초</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>
                            재사용 대기시간 감소{'('}%{')'}
                        </Dstatname>
                        <Dstatinfo> {coolTimepercent}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>재사용 대기시간 미적용</Dstatname>
                        <Dstatinfo> {coolTimeNone}%</Dstatinfo>
                    </DetailedStatContainer>
                </StatBorderContainer>
                <StatBorderContainer>
                    <DetailedStatContainer>
                        <Dstatname>속성 내성 무시</Dstatname>
                        <Dstatinfo> {attributeIgnore}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>상태이상 추가 데미지</Dstatname>
                        <Dstatinfo> {addDemage}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>상태이상 내성</Dstatname>
                        <Dstatinfo> {debuff}</Dstatinfo>
                    </DetailedStatContainer>
                </StatBorderContainer>
                <StatBorderContainer>
                    <DetailedStatContainer>
                        <Dstatname>추가 경험치 획득</Dstatname>
                        <Dstatinfo> {addExp}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>소환수 지속시간 증가</Dstatname>
                        <Dstatinfo> {incDuration}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>무기숙련도</Dstatname>
                        <Dstatinfo> {weaponSkills}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>스탠스</Dstatname>
                        <Dstatinfo> {stance}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>방어력</Dstatname>
                        <Dstatinfo> {defense}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>버프 지속시간</Dstatname>
                        <Dstatinfo> {buffTime}%</Dstatinfo>
                    </DetailedStatContainer>
                </StatBorderContainer>
                <StatBorderContainer>
                    <DetailedStatContainer>
                        <Dstatname>이동속도</Dstatname>
                        <Dstatinfo> {speed}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>점프력</Dstatname>
                        <Dstatinfo> {jump}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>공격 속도</Dstatname>
                        <Dstatinfo> {attackSpeed}단계</Dstatinfo>
                    </DetailedStatContainer>
                </StatBorderContainer>
                <StatBorderContainer>
                    <DetailedStatContainer>
                        <Dstatname>아이템 드롭률</Dstatname>
                        <Dstatinfo> {itemDrop}%</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>메소 획득량</Dstatname>
                        <Dstatinfo> {mesoDrop}%</Dstatinfo>
                    </DetailedStatContainer>
                </StatBorderContainer>
                <StatBorderContainer>
                    <DetailedStatContainer>
                        <Dstatname>AP 배분 STR</Dstatname>
                        <Dstatinfo> {apStr}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>AP 배분 DEX</Dstatname>
                        <Dstatinfo> {apDex}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>AP 배분 INT</Dstatname>
                        <Dstatinfo> {apInt}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>AP 배분 LUK</Dstatname>
                        <Dstatinfo> {apLuk}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>AP 배분 HP</Dstatname>
                        <Dstatinfo> {apHp}</Dstatinfo>
                    </DetailedStatContainer>
                    <DetailedStatContainer>
                        <Dstatname>AP 배분 MP</Dstatname>
                        <Dstatinfo> {apMp}</Dstatinfo>
                    </DetailedStatContainer>
                </StatBorderContainer>

                <StatBorderContainer>
                    <ButtonBorder>
                        어빌리티
                        <PresetBt onClick={() => handleAbPresetClick(0)} isSelected={selectAbPreset == 0}>
                            프리셋 1
                        </PresetBt>
                        <PresetBt onClick={() => handleAbPresetClick(1)} isSelected={selectAbPreset == 1}>
                            프리셋 2
                        </PresetBt>
                        <PresetBt onClick={() => handleAbPresetClick(2)} isSelected={selectAbPreset == 2}>
                            프리셋 3
                        </PresetBt>
                    </ButtonBorder>
                    <AbilityContainer>
                        {abPresets[selectAbPreset] ? (
                            abPresets[selectAbPreset].map((ability, index) => (
                                <div key={index}>
                                    <Abilitybox>{ability.ability_grade}</Abilitybox>
                                    <Abilitybox>{ability.ability_value} </Abilitybox>
                                </div>
                            ))
                        ) : (
                            <div>Loading...</div>
                        )}
                    </AbilityContainer>
                </StatBorderContainer>
                <StatBorderContainer>
                    <ButtonBorder>
                        하이퍼스탯
                        <PresetBt onClick={() => handleHyperPresetClick(0)} isSelected={selectHyperPreset == 0}>
                            프리셋 1
                        </PresetBt>
                        <PresetBt onClick={() => handleHyperPresetClick(1)} isSelected={selectHyperPreset == 1}>
                            프리셋 2
                        </PresetBt>
                        <PresetBt onClick={() => handleHyperPresetClick(2)} isSelected={selectHyperPreset == 2}>
                            프리셋 3
                        </PresetBt>
                    </ButtonBorder>
                    <HyperStatContainer>
                        {hyperPresets[selectHyperPreset] ? (
                            <>
                                {hyperPresets[selectHyperPreset].map(
                                    (stat, index) =>
                                        stat.stat_level > 0 && (
                                            <div key={index}>
                                                <Hyperbox>
                                                    Lv: {stat.stat_level} &nbsp;
                                                    {stat.stat_increase}
                                                </Hyperbox>
                                            </div>
                                        )
                                )}
                            </>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </HyperStatContainer>
                </StatBorderContainer>
            </LeftContainer>

            <RightContainer>
                <TitleText>
                    장비
                    <ButtonBorder>
                        <PresetBt onClick={() => handleEquipPresetClick(0)} isSelected={selectEquipPreset == 0}>
                            프리셋 1
                        </PresetBt>
                        <PresetBt onClick={() => handleEquipPresetClick(1)} isSelected={selectEquipPreset == 1}>
                            프리셋 2
                        </PresetBt>
                        <PresetBt onClick={() => handleEquipPresetClick(2)} isSelected={selectEquipPreset == 2}>
                            프리셋 3
                        </PresetBt>
                    </ButtonBorder>
                </TitleText>
                <EquipInnerContainer>
                    {EquipPresets[selectEquipPreset].map((equip, index) => (
                        <EquipContainer key={index}>
                            <EquipUpContainer>
                                <EquipImgContainer imgUrl={equip.item_icon} />
                                <EquipRightContainer>
                                    <EquipPartContainer>{equip.item_equipment_part}</EquipPartContainer>
                                    <EquipNameContainer>{equip.item_name}</EquipNameContainer>
                                    <EquipInfoContainer>
                                        {equip.starforce != 0 && <Starforce starforceScrollFlag={equip.starforce_scroll_flag}>★{equip.starforce}</Starforce>}
                                        {/* <AdditionalOptions>급</AdditionalOptions> */}
                                    </EquipInfoContainer>
                                </EquipRightContainer>
                            </EquipUpContainer>
                            {equip.potential_option_1 ||
                            equip.potential_option_2 ||
                            equip.potential_option_3 ||
                            equip.additional_potential_option_1 ||
                            equip.additional_potential_option_2 ||
                            equip.additional_potential_option_3 ? (
                                <EquipDownContainer>
                                    <UpperContainer>
                                        <UpperName>잠재</UpperName>
                                        {equip.potential_option_1 && <UpperOption>{equip.potential_option_1}</UpperOption>}
                                        {equip.potential_option_2 && <UpperOption>{equip.potential_option_2}</UpperOption>}
                                        {equip.potential_option_3 && <UpperOption>{equip.potential_option_3}</UpperOption>}
                                    </UpperContainer>
                                    <LowerContainer>
                                        <LowerName>에디</LowerName>
                                        {equip.additional_potential_option_1 && <LowerOption>{equip.additional_potential_option_1}</LowerOption>}
                                        {equip.additional_potential_option_2 && <LowerOption>{equip.additional_potential_option_2}</LowerOption>}
                                        {equip.additional_potential_option_3 && <LowerOption>{equip.additional_potential_option_3}</LowerOption>}
                                    </LowerContainer>
                                </EquipDownContainer>
                            ) : null}
                        </EquipContainer>
                    ))}
                </EquipInnerContainer>
            </RightContainer>
        </Container>
    );
}

const Container = styled.div`
    //전체 컨테이너
    display: flex;
    font-family: 'Cafe24SsurroundAir';
    width: 100%;
`;
const TitleText = styled.div`
    width: 100%;
    height: 5vh;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
    line-height: 5vh;
    background-color: #eceff7;
    color: black;
    border-radius: 8px 8px 0px 0px;
    border-bottom: 2px solid #dde3e9;
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const LeftContainer = styled.div`
    //왼쪽 컨테이너 (스탯)
    flex-direction: column;
    border: 2px solid #dde3e9;
    width: 20%;
    border-radius: 8px;
    margin-right: 0.7vw;
`;

const RightContainer = styled.div`
    //오른쪽 컨테이너 (장비)
    border: 2px solid #dde3e9;
    border-radius: 8px;
    width: 80%;
    background-color: rgba(233, 234, 238);
`;
const BgImgContainer = styled.div`
    //배경 이미지
    background-image: url(${(props) => className[props.class]});
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 8vh;
    height: 8vh;
    border: 2px solid #dde3e9;
    border-radius: 50%;
`;
//전투력 컨테이너
const CPContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-left: 0.8vw;
`;
const Cpname = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 0.8vw;
    height: 100%;
    width: 100%;
`;
const Cpinfo = styled.div`
    //전투력 요소 컨테이너
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 1vw;
    height: 100%;
    width: 100%;
`;
//스탯 컨테이너
const StatContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 2%;
    border-bottom: 2px solid #dde3e9;
`;
const Stname = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 0.7vw;
`;
const Stinfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 0.8vw;
`;

const StatBorderContainer = styled.div`
    border-bottom: 2px solid #dde3e9;
`;

const DetailedStatContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px;
    margin-top: 7.5px;
    margin-bottom: 7.5px;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 0.7vw;
    justify-content: space-between;
`;
const Dstatname = styled.div``;
const Dstatinfo = styled.div``;

const MergeContainer = styled.div`
    display: flex;
    border-bottom: 2px solid #dde3e9;
    align-items: center;
    padding: 2%;
    justify-content: center;
`;
const AbilityContainer = styled.div`
    align-items: center;
    justify-content: left;
    flex-direction: column;
    margin-bottom: 10px;
    font-size: 0.75vw;
    margin-top: 7.5px;
    margin-bottom: 7.5px;
    padding-left: 5px;
    padding-right: 5px;
`;
const Abilitybox = styled.div`
    align-items: left;
    justify-content: left;
`;
const HyperStatContainer = styled.div`
    align-items: center;
    justify-content: left;
    font-size: 0.75vw;
    flex-direction: column;
    margin-top: 7.5px;
    margin-bottom: 7.5px;
    padding-left: 5px;
    padding-right: 5px;
`;
const Hyperbox = styled.div`
    align-items: left;
    justify-content: left;
`;
const ButtonBorder = styled.div`
    border-bottom: 2px solid #dde3e9;
    margin-bottom: 10px;
    font-size: 0.75vw;
    margin-top: 7.5px;
    margin-bottom: 7.5px;
    padding-left: 5px;
    padding-right: 5px;
`;
const PresetBt = styled.button`
    font-family: 'Cafe24SsurroundAir';
    margin-left: 5px;
    margin-bottom: 10px;
    border-radius: 8px;
    font-size: 0.6vw;
    border: solid 1px #ced4da;
    cursor: pointer;
    background-color: ${(props) => (props.isSelected ? '#adb5bd' : 'white')};

    &:hover {
        background: #adb5bd;
    }
`;

const EquipInnerContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 31.5% 31.5% 31.5%;
    grid-template-rows: 12% 12% 12%;
    justify-content: space-evenly;
`;
//장비창 전체 컨테이너
const EquipContainer = styled.div`
    box-sizing: border-box;
    background-color: white;
    border-radius: 8px;
    border: 2px solid #dde3e9;
    margin-top: 2.5vh;
    width: 100%;
`;
//위쪽 장비 컨테이너
const EquipUpContainer = styled.div`
    display: flex;
    border-bottom: 2px solid #dde3e9;
    font-size: 0.69vw;
    align-items: center;
    height: 9vh;
`;
//아래쪽 장비 컨테이너
const EquipDownContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
//위쪽 오른쪽 컨테이너
const EquipRightContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

//장비 이미지
const EquipImgContainer = styled.div`
    box-sizing: border-box;
    background-image: url(${(props) => props.imgUrl});
    background-size: contain;
    background-repeat: no-repeat;
    padding: 1vw;
    margin: 1vw;
    background-position: top center;
    width: 2vw;
`;
//장비 위치
const EquipPartContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    color: rgba(136, 139, 152);
`;
//장비 이름
const EquipNameContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0px 10px 10px 10px;
`;
//장비 정보(스타포스, 추옵)
const EquipInfoContainer = styled.div`
    display: flex;
    padding: 0px 10px 10px 10px;
    align-items: center;
`;
//스타포스
const Starforce = styled.div`
    background-color: rgba(255, 248, 232);
    margin-right: 8px;
    color: ${(props) => (props.starforceScrollFlag === '사용' ? 'rgba(127,195,255)' : 'rgba(246, 167, 48)')};
    border-radius: 5px;
    margin: 2px;
`;
//추옵
const AdditionalOptions = styled.div`
    margin: 2px;
    background-color: rgba(245, 245, 245);
    color: rgba(102, 106, 122);
    border-radius: 5px;
`;

//윗잠
const UpperContainer = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    font-size: 0.6vw;
`;
const UpperName = styled.div`
    font-weight: bold;
    margin-right: 10px;
`;
const UpperOption = styled.div`
    margin-right: 10px;
`;

//아랫잠
const LowerContainer = styled.div`
    padding: 0px 10px 10px 10px;
    display: flex;
    font-size: 0.6vw;
`;
const LowerName = styled.div`
    font-weight: bold;
    margin-right: 10px;
`;

const LowerOption = styled.div`
    margin-right: 10px;
`;

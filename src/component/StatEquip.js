import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
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

import ArchMage_Fire_Poison from '../picture/class/Mage/Arch Mage (Fire, Poison).jpg';
import ArchMage_Ice_Lightning from '../picture/class/Mage/Arch Mage (Ice, Lightning).jpg';
import Bishop from '../picture/class/Mage/Bishop.jpg';
import Flame_wizard from '../picture/class/Mage/Flame wizard.jpg';
import Battle_mage from '../picture/class/Mage/Battle mage.jpg';
import Evan from '../picture/class/Mage/Evan.jpg';
import Luminous from '../picture/class/Mage/Luminous.jpg';
import Illium from '../picture/class/Mage/Illium.jpg';
import Kinesis from '../picture/class/Mage/Kinesis.jpg';
import Lala from '../picture/class/Mage/Lala.jpg';

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

export default function StatEquip() {
    const maple_api = process.env.REACT_APP_NEXON_OPEN_API2;

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
                `https://open.api.nexon.com/maplestory/v1/character/ability?ocid=${ocid}&date=${usingday}
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
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <Container>
            <BgImgContainer class={characterClass}>
                <CPContainer>전투력 : {formatNumber(cp)} </CPContainer>
                <StatContainer>
                    스탯 공격력 : {commaNumber(minStat)} ~ {commaNumber(maxStat)}
                </StatContainer>
                <DetailedStatContainer>
                    HP : {commaNumber(hp)} | MP : {commaNumber(mp)} | STR : {commaNumber(str)} | DEX : {commaNumber(dex)} | INT : {commaNumber(int)} | LUK : {commaNumber(luk)}
                </DetailedStatContainer>
                <DetailedStatContainer>
                    데미지 : {demage}% | 최종 데미지 : {lastDemage}% | 보스 몬스터 데미지 : {bossDemage}% | 일반 몬스터 데미지 : {normalDemage}%
                </DetailedStatContainer>
                <DetailedStatContainer>
                    공격력 : {commaNumber(attackPower)} | 마력 : {commaNumber(magicPower)} | 방어율 무시 : {ignoreGuard}% | 크리티컬 확률 : {critical}% | 크리티컬 데미지 : {criticalDemage}%
                </DetailedStatContainer>
                <DetailedStatContainer>
                    스타포스 : {commaNumber(starforce)} | 아케인포스 : {commaNumber(arcane)} | 어센틱포스 : {commaNumber(authentic)}
                </DetailedStatContainer>
                <DetailedStatContainer>
                    재사용 대기시간 감소{'('}초{')'} : {coolTimesecond}초 | 재사용 대기시간 감소{'('}%{')'} : {coolTimepercent}% | 재사용 대기시간 미적용 : {coolTimeNone}%
                </DetailedStatContainer>
                <DetailedStatContainer>
                    속성 내성 무시 : {attributeIgnore}% | 상태이상 추가 데미지 : {addDemage}% | 상태이상 내성 : {debuff}
                </DetailedStatContainer>
                <DetailedStatContainer>
                    추가 경험치 획득 : {addExp}% | 소환수 지속시간 증가 : {incDuration}% | 무기숙련도 : {weaponSkills}% | 스탠스 : {stance}% | 방어력 : {defense} | 버프 지속시간 : {buffTime}%
                </DetailedStatContainer>
                <DetailedStatContainer>
                    이동속도 : {speed}% | 점프력 : {jump}% | 공격 속도 : {attackSpeed}단계
                </DetailedStatContainer>
                <DetailedStatContainer>
                    아이템 드롭률 : {itemDrop}% | 메소 획득량 : {mesoDrop}%
                </DetailedStatContainer>
                <DetailedStatContainer>
                    AP 배분 STR : {apStr} | AP 배분 DEX : {apDex} | AP 배분 INT : {apInt} | AP 배분 LUK : {apLuk} | AP 배분 HP : {apHp} | AP 배분 MP : {apMp}
                </DetailedStatContainer>
                <MergeContainer>
                    <AbilityContainer>
                        어빌리티:
                        <PresetBt onClick={() => handleAbPresetClick(0)}>프리셋 1</PresetBt>
                        <PresetBt onClick={() => handleAbPresetClick(1)}>프리셋 2</PresetBt>
                        <PresetBt onClick={() => handleAbPresetClick(2)}>프리셋 3</PresetBt>
                        {abPresets[selectAbPreset] ? (
                            abPresets[selectAbPreset].map((ability, index) => (
                                <div key={index}>
                                    <Abilitybox>{ability.ability_no}</Abilitybox>
                                    <Abilitybox>{ability.ability_grade}</Abilitybox>
                                    <Abilitybox>{ability.ability_value} </Abilitybox>
                                </div>
                            ))
                        ) : (
                            <div>Loading...</div>
                        )}
                    </AbilityContainer>

                    <HyperStatContainer>
                        하이퍼스탯:
                        <PresetBt onClick={() => handleHyperPresetClick(0)}>프리셋 1</PresetBt>
                        <PresetBt onClick={() => handleHyperPresetClick(1)}>프리셋 2</PresetBt>
                        <PresetBt onClick={() => handleHyperPresetClick(2)}>프리셋 3</PresetBt>
                        {hyperPresets[selectHyperPreset] ? (
                            <>
                                {hyperPresets[selectHyperPreset].stats.map((stat, index) => (
                                    <div key={index}>
                                        <p>스탯 레벨: {stat.stat_level}</p>
                                        <p>스탯 증가량: {stat.stat_increase}</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </HyperStatContainer>
                </MergeContainer>
            </BgImgContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Cafe24SsurroundAir';
    justify-content: center;
`;
const BgImgContainer = styled.div`
    position: relative;
    z-index: 9999;
    background-image: url(${(props) => className[props.class]});
    background-position: right top;
    background-size: 24%;
    background-repeat: no-repeat;
`;
//전투력 컨테이너
const CPContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 1.2vw;
    padding-bottom: 10px;
    margin-bottom: 10px;
`;
//스탯 컨테이너
const StatContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 0.9vw;
    padding-bottom: 10px;
    margin-bottom: 10px;
`;
const DetailedStatContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    border: 1px;
    padding-bottom: 7.5px;
    margin-bottom: 7.5px;
    font-size: 0.7vw;
`;
const MergeContainer = styled.div`
    display: flex;
`;
const AbilityContainer = styled.div`
    align-items: center;
    justify-content: left;
    flex-direction: column;
    margin-bottom: 10px;
    font-size: 0.75vw;
    width: 50%;
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
    width: 50%;
`;
const PresetBt = styled.button`
    font-family: 'Cafe24SsurroundAir';
    margin-right: 3px;
    margin-bottom: 5px;
    border-radius: 8px;
    border: solid 1px #ced4da;
    cursor: pointer;
    &:hover {
        background: #adb5bd;
    }
`;

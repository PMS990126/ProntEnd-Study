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
    듀얼블레이드: Dual_blade,
    나이트워커: Night_worker,
    제논: Xenon,
    팬텀: Phantom,
    카데나: Cadena,
    칼리: Khali,
    호영: Ho_young,
    바이퍼: Viper,
    캡틴: Captain,
    캐논슈터: Cannon_shooter,
    스트라이커: Striker,
    메카닉: Mechanic,
    은월: Eunwol,
    엔젤릭버스터: Angelic_buster,
    아크: Ark,
};

export default function StatEquip() {
    const maple_api = process.env.REACT_APP_NEXON_OPEN_API;

    const [cp, setCp] = useState(null); //전투력
    const [minStat, setMinStat] = useState(null); //최소 스공
    const [maxStat, setMaxStat] = useState(null); //최대 스공
    const [hp, setHp] = useState(null);
    const [mp, setMp] = useState(null);
    const [str, setStr] = useState(null);
    const [dex, setDex] = useState(null);
    const [int, setInt] = useState(null);
    const [luk, setLuk] = useState(null);
    const [demage, setDemage] = useState(null);
    const [lastdemage, setLastDemage] = useState(null);
    const [normaldemage, setNormaldemage] = useState(null);

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
            const { final_stat } = getCharacterStat.data;
            final_stat((stat) => {
                switch (stat.stat_name) {
                    case '전투력':
                        setCp(stat.stat_value);
                        break;
                    case 'HP':
                        setCp(stat.stat_value);
                        break;
                    case 'MP':
                        setCp(stat.stat_value);
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
                    default:
                        break;
                }
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <Container>
            <CPContainer>전투력:</CPContainer>
            <StatContainer>스탯:</StatContainer>
            <DetailedStatContainer>상세스탯:</DetailedStatContainer>
            <AbilityContainer>어빌리티:</AbilityContainer>
            <HyperStatContainer>하이퍼스탯:</HyperStatContainer>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    font-family: 'Cafe24SsurroundAir';
    justify-content: center;
`;
//직업 이미지 컨테이너
const ClassImgContainer = styled.div``;
//전투력 컨테이너
const CPContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 20px;
`;
//스탯 컨테이너
const StatContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
`;
const DetailedStatContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
`;
const AbilityContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
`;
const HyperStatContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
`;

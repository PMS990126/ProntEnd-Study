import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const maple_api = process.env.REACT_APP_NEXON_OPEN_API2;

    const [searchTerm, setSearchTerm] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${encodeURIComponent(searchTerm)}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-nxopen-api-key': maple_api,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ocid) {
                    navigate(`/u/${data.ocid}`);
                } else {
                    alert('존재하지 않는 캐릭터 이름입니다');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <Container>
            <a href="/">
                <HeaderText>MAPLE.GG</HeaderText>
            </a>
            <form onSubmit={handleSearch}>
                <InputBox type="text" placeholder="검색어를 입력하세요" value={searchTerm} onChange={handleChange} />
            </form>
        </Container>
    );
}

const Container = styled.div`
    background-color: rgba(33, 34, 39);
    max-width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 0px;
    width: 100%;
    line-height: 1.5;
    a {
        text-decoration: none;
        color: white;
        &:visited {
            color: white;
        }
        &:hover {
            color: white;
        }
        &:active {
            color: white;
        }
    }
`;
const HeaderText = styled.div`
    font-size: 30px;
    color: white;
    font-family: 'Maplestory Bold';
    padding-left: 10vw;
    margin-right: 2vw;
`;

const InputBox = styled.input`
    width: 100%;
    /* max-width: 40%; */
    border: 1px solid #bbb;
    border-radius: 8px;
    padding: 5px 6px;
    font-size: 14px;
    font-family: 'Cafe24SsurroundAir';
`;

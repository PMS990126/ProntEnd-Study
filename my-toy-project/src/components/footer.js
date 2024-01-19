import { NavLink } from "react-router-dom"
import styled from 'styled-components';

export default function Footer() {
    return (
        <Container>
            <FooterNavbar>
                <FooterNavi to = {""}>서비스 이용약관</FooterNavi>
                <Divider>|</Divider>
                <FooterNavi to = {""}>개인정보 취급방침</FooterNavi>
                <Divider>|</Divider>
                <FooterNavi to = {""}>제휴 문의</FooterNavi>
                <Divider>|</Divider>
                <FooterNavi to = {""}>고객센터</FooterNavi>
                <Divider>|</Divider>
                <FooterNavi to = {""}>채용</FooterNavi>
            </FooterNavbar>
            <FooterText>
                © All Rights Reserved. Hosted by PlayXP Inc. Maple.GG is not associated with NEXON Korea. Data based on NEXON Open API.
            </FooterText>
        </Container>
    );
}

const Container = styled.div`
    background-color: #212227;
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const FooterNavbar = styled.div`
    margin-bottom: 10px;
`;

const FooterNavi = styled(NavLink)`
    font-size: 12.5px;
    color: white;
    text-decoration: none;
`;

const Divider = styled.span`
    margin: 0 2vw;
    color: white;
`;

const FooterText = styled.div`
    font-size: 12.5px;
    color: white;
`;
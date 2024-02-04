import logo from './logo.svg';
import * as react from 'react';
import styled from 'styled-components';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Nav from './component/Nav';
import Main from './component/Main';
import Percentage from './component/Percentage';
import Ranking from './component/Ranking';
import Footer from './component/Footer';
import CharacterPage from './component/CharacterPage';
import backgroundImage from './picture/Elluel.png';
import Test from './component/Test';

function App() {
    return (
        <BrowserRouter>
            <Container>
                <Header />
                <Nav />
                <InsideContainer>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/Ranking" element={<Ranking />} />
                        <Route path="/Percentage" element={<Percentage />} />
                        <Route path="/u/:ocid" element={<CharacterPage />} />
                    </Routes>
                </InsideContainer>
                <Footer />
            </Container>
        </BrowserRouter>
    );
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
const InsideContainer = styled.div`
    flex-grow: 1;
`;
export default App;

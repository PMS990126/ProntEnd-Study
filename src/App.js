import logo from './logo.svg';
import * as react from 'react';
import styled from 'styled-components';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Nav from './component/Nav';
import Home from './component/Home';
import Percentage from './component/Percentage';
import Ranking from './component/Ranking';
import Footer from './component/Footer';
import Test1 from './component/Test1';
import backgroundImage from './picture/Elluel.png';
import CharacterPage from './component/CharacterPage';

function App() {
    return (
        <BrowserRouter>
            <Container>
                <Header />
                <Nav />
                <InsideContainer>
                    <Routes>
                        <Route path="/" element={<Home />} />
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

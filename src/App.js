import logo from './logo.svg';
import * as react from 'react';
import styled from 'styled-components';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Nav from './component/Nav';
import Main from './component/Main';
import Percentage from './component/Percentage';
import Ranking from './component/Ranking';
import Footer from './component/Footer';
import bgImg1 from './picture/Elluel.png';
import bgImg2 from './picture/Ellev.png';
import bgImg3 from './picture/Arcana.png';

function App() {
    return (
        <BrowserRouter>
            <Container>
                <Header />
                <Nav />
                <Container>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/Ranking" element={<Ranking />} />
                        <Route path="/Percentage" element={<Percentage />} />
                    </Routes>
                </Container>
                <Footer />
            </Container>
        </BrowserRouter>
    );
}

const backgroundArr=[bgImg1,bgImg2,bgImg3];
const randomIndex=Math.floor(Math.random()*backgroundArr.length);
const backgroundImage=backgroundArr[randomIndex];

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export default App;

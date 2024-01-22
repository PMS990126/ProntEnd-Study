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
import backgroundImage from './picture/Elluel.png';

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
    width: 100vw;
    height: 100vh;
    background: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    flex-grow: 1;
`;
export default App;

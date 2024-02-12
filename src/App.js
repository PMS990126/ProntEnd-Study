import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Nav from './component/Nav';
import Main from './component/Main';
import Percentage from './component/Percentage';
import Ranking from './component/Ranking';
import Footer from './component/Footer';
import SearchPage from './component/SearchPage';
import Stats from './component/Stats';
import Skills from './component/Skills';
import Union from './component/Union';
import MainSub from './component/MainSub';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Nav />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/Ranking" element={<Ranking />} />
                    <Route path="/Percentage" element={<Percentage />} />
                    <Route path="/SearchPage" element={<SearchPage />} />
                    <Route path="/Stats" element={<Stats />} />
                    <Route path="/Skills" element={<Skills />} />
                    <Route path="/Union" element={<Union />} />
                    <Route path="/MainSub" element={<MainSub />} />
                    
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;

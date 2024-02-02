import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Nav from './component/Nav';
import Main from './component/Main';
import Percentage from './component/Percentage';
import Ranking from './component/Ranking';
import Footer from './component/Footer';
import styled from 'styled-components';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Nav />
                <Footer />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/Ranking" element={<Ranking />} />
                    <Route path="/Percentage" element={<Percentage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

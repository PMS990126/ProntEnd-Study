import * as React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import styled from "styled-components";
import Header from "./components/header.js";
import NavBar from "./components/navBar.js";
import Footer from "./components/footer.js";
import Home from "./components/home.js";
import SearchPage from "./components/searchPage.js";

function App() {
    return(
        <BrowserRouter>
            <Container>
                <Header/>
                <NavBar/>
                <InsideContainer>
                    <Routes>
                        <Route path="/Home" element={<Home />} />
                        <Route path="/searchPage" element={<SearchPage />} />
                    </Routes>
                </InsideContainer>
                <Footer/>
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

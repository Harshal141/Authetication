import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './Register';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route exact path="home" element={<Home/>} />
            <Route exact path="login" element={<Login/>} />
            <Route exact path="register" element={<Register/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
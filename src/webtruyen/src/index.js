import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Author from './Component/Homepage/Author/Author';
import Comic from './Component/Homepage/Comic/Comic';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Genre from './Component/Homepage/Genres/Genre';
import Nav from './Component/Nav/Nav';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Author />} />
        </Route>
        <Route path="/comic" element={<Comic />}>
        </Route>
        <Route path="/genre" element={<Genre />}>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

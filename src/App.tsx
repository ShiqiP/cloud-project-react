import React, { useContext, useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { Outlet, Routes } from 'react-router';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Page from './page/Page';
import { LoginProvider } from './context/LoginContext';
import { PopupProvider } from "./context/PopupContext";

function App() {

  return (
    <>
      <PopupProvider>
        <LoginProvider>
          <AuthProvider>
            <Page />
          </AuthProvider>
        </LoginProvider>
      </PopupProvider>
    </>
  );
}

export default App;

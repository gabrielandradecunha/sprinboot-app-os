import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import OsForm from './pages/OsForm/OsForm';
import EmpresaForm from './pages/EmpresaForm/EmpresaForm';
import CreateUser from './pages/CreateUser/CreateUser';
import ClienteForm from './pages/ClienteForm/ClienteForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/os" element={<OsForm />} />
        <Route path="/empresaform" element={<EmpresaForm />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/cliente" element={<ClienteForm />} />
      </Routes>
    </BrowserRouter>
  );
}

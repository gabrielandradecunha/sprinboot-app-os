import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Spring SO</div>

      <ul className="navbar-links">
        <li><Link to="/home">Início</Link></li>
        <li><Link to="/os">O.S.</Link></li>
        <li><Link to="/empresaform">Empresas</Link></li>
        <li><Link to="/cliente">Clientes</Link></li> 
        <li><Link to="/create-user">Cadastrar Usuário</Link></li> 
      </ul>

      <button className="logout-btn" onClick={handleLogout}>
        Sair
      </button>
    </nav>
  );
}

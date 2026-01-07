import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import Navbar from '../../components/Navbar/Navbar';

interface ErrorResponse {
  error?: string;
}

export default function CreateUser() {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [erro, setErro] = useState<string>('');
  const [sucesso, setSucesso] = useState<string>('');

  const token = localStorage.getItem('token');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
      await axios.post('/auth/register', {
        nome,
        email,
        senha,
      })


      setSucesso('Usuário criado com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      setErro(error.response?.data?.error ?? 'Erro ao criar usuário.');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1>Criar Usuário</h1>

          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
          >
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '8px' }}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '8px' }}
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '8px' }}
            />

            <button
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: '#268700',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Criar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

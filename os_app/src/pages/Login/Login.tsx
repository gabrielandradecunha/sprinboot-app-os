import React, { useState, FormEvent, ChangeEvent } from 'react'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'

interface LoginResponse {
  token: string
}

interface ErrorResponse {
  message?: string
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post<LoginResponse>(
          '/auth/login', // ✅ path relativo → passa pelo proxy
          {
            email,
            senha,
          }
      )

      localStorage.setItem('token', response.data.token)
      navigate('/home')
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>

      setError(
          axiosError.response?.data?.message ??
          'Email ou senha inválidos'
      )
    }
  }

  return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
              }
              placeholder="Email"
              required
          />

          <input
              type="password"
              value={senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSenha(e.target.value)
              }
              placeholder="Senha"
              required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Entrar</button>
        </form>
      </div>
  )
}

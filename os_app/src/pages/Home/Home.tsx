import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import './Home.css'

interface Usuario {
  id: number
  nome: string
  email: string
}

interface OrdemServico {
  id: number
  numero: string
  cliente: string
  tipoProduto: string
  defeito: string
  descricao: string
  valor: number
  status: boolean
}


export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [ordens, setOrdens] = useState<OrdemServico[]>([])
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  const fetchUsuarios = async () => {
    if (!token) {
      setErro('Usuário não autenticado')
      setUsuarios([])
      return
    }

    try {
      const response = await axios.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUsuarios(response.data)
    } catch (err) {
      console.error(err)
      setErro('Erro ao carregar usuários.')
      setUsuarios([])
    }
  }

  const fetchOrdens = async () => {
    if (!token) {
      setErro('Usuário não autenticado')
      setOrdens([])
      return
    }

    try {
      const response = await axios.get('/os', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setOrdens(response.data)
    } catch (err) {
      console.error(err)
      setErro('Erro ao carregar ordens de serviço.')
      setOrdens([])
    }
  }

  useEffect(() => {
    setLoading(true)
    Promise.all([fetchUsuarios(), fetchOrdens()])
        .finally(() => setLoading(false))
  }, [token])

  const handleDeleteUsuario = async (id: number) => {
    if (!token) return
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return

    try {
      await axios.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUsuarios(prev => prev.filter(u => u.id !== id))
    } catch (err) {
      console.error(err)
      setErro('Não foi possível deletar o usuário.')
    }
  }

  const handleDeleteOS = async (id: number) => {
    if (!token) return
    if (!window.confirm('Tem certeza que deseja deletar esta O.S.?')) return

    try {
      await axios.delete(`/os/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setOrdens(prev => prev.filter(o => o.id !== id))
    } catch (err) {
      console.error(err)
      setErro('Não foi possível deletar a O.S.')
    }
  }

  return (
      <div>
        <Navbar />
        <div className="home-container">
          <h1>Bem-vindo!</h1>

          {loading && <p>Carregando dados...</p>}
          {erro && <p className="erro">{erro}</p>}

          <section className="table-section">
            <h2>Usuários do Sistema</h2>
            {usuarios.length > 0 ? (
                <table className="table">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                  </tr>
                  </thead>
                  <tbody>
                  {usuarios.map(u => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.nome}</td>
                        <td>{u.email}</td>
                        <td>
                          <button
                              className="delete-btn"
                              onClick={() => handleDeleteUsuario(u.id)}
                          >
                            Deletar
                          </button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            ) : (
                !loading && <p>Nenhum usuário encontrado.</p>
            )}
          </section>

          <section className="table-section">
            <h2>Ordens de Serviço</h2>
            {ordens.length > 0 ? (
                <table className="table">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Número</th>
                    <th>Cliente</th>
                    <th>Produto</th>
                    <th>Defeito</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                  </thead>
                  <tbody>
                  {ordens.map(o => (
                      <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.numero}</td>
                        <td>{o.cliente}</td>
                        <td>{o.tipoProduto}</td>
                        <td>{o.defeito}</td>
                        <td>{o.descricao}</td>
                        <td>R$ {Number(o.valor).toFixed(2)}</td>
                        <td>{o.status ? 'Concluída' : 'Aberta'}</td>
                        <td>
                          <button
                              className="delete-btn"
                              onClick={() => handleDeleteOS(o.id)}
                          >
                            Deletar
                          </button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            ) : (
                !loading && <p>Nenhuma O.S. encontrada.</p>
            )}
          </section>
        </div>
      </div>
  )
}

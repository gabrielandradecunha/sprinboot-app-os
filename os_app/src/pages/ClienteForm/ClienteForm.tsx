import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import './ClienteForm.css'

interface ClienteFormData {
  nome: string
  email: string
  telefone: string
  endereco: string
  id_empresa: number | ''
}

interface Cliente {
  id: number
  nome: string
  email?: string
  telefone?: string
  endereco?: string
  id_empresa: number
}

interface Empresa {
  id: number
  nome: string
}

export default function ClienteForm(): React.ReactElement {
  const [form, setForm] = useState<ClienteFormData>({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    id_empresa: ''
  })

  const [mensagem, setMensagem] = useState('')
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [empresas, setEmpresas] = useState<Empresa[]>([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) return

    const fetchDados = async () => {
      const [clientesRes, empresasRes] = await Promise.all([
        axios.get<Cliente[]>('/cliente', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get<Empresa[]>('/empresa', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      setClientes(clientesRes.data)
      setEmpresas(empresasRes.data)
    }

    fetchDados().catch(console.error)
  }, [token])

  const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: name === 'id_empresa' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMensagem('')

    try {
      await axios.post('/cliente', form, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setMensagem('Cliente cadastrado com sucesso!')
      setForm({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        id_empresa: ''
      })

      const response = await axios.get<Cliente[]>('/cliente', {
        headers: { Authorization: `Bearer ${token}` }
      })

      setClientes(response.data)
    } catch {
      setMensagem('Erro ao cadastrar cliente.')
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja realmente deletar este cliente?')) return

    try {
      await axios.delete(`/cliente/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setClientes(prev => prev.filter(c => c.id !== id))
      setMensagem('Cliente deletado com sucesso!')
    } catch {
      setMensagem('Erro ao deletar cliente.')
    }
  }

  return (
      <div className="empresa-container">
        <Navbar />

        <form className="empresa-form" onSubmit={handleSubmit}>
          <a href="/home" className="voltar">Voltar</a>
          <h2>Cadastrar Cliente</h2>

          <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome do Cliente"
              required
          />

          <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
          />

          <input
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="Telefone"
          />

          <input
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
              placeholder="Endereço"
          />

          <select
              name="id_empresa"
              value={form.id_empresa}
              onChange={handleChange}
              required
          >
            <option value="">Selecione a Empresa</option>
            {empresas.map(e => (
                <option key={e.id} value={e.id}>
                  {e.nome}
                </option>
            ))}
          </select>

          <button type="submit">Salvar</button>
          {mensagem && <p className="mensagem">{mensagem}</p>}
        </form>

        <div className="empresa-list">
          <h2>Clientes Cadastrados</h2>

          {clientes.length === 0 ? (
              <p>Nenhum cliente cadastrado.</p>
          ) : (
              <table>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Endereço</th>
                  <th>Empresa</th>
                  <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {clientes.map(c => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.nome}</td>
                      <td>{c.email}</td>
                      <td>{c.telefone}</td>
                      <td>{c.endereco}</td>
                      <td>
                        {empresas.find(e => e.id === c.id_empresa)?.nome ?? 'N/A'}
                      </td>
                      <td>
                        <button
                            onClick={() => handleDelete(c.id)}
                            className="delete-btn"
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
          )}
        </div>
      </div>
  )
}

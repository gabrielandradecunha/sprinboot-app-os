import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import './EmpresaForm.css'

interface EmpresaFormData {
  nome: string
  cnpj: string
  telefone: string
  email: string
  endereco: string
  id_user: number | ''
}

interface Empresa {
  id: number
  nome: string
  cnpj?: string
  telefone?: string
  email?: string
  endereco?: string
  id_user: number
}

interface Usuario {
  id: number
  nome: string
}


const normalizeArray = <T,>(data: any): T[] => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.content)) return data.content
  if (Array.isArray(data?.empresas)) return data.empresas
  return []
}

export default function EmpresaForm() {
  const [form, setForm] = useState<EmpresaFormData>({
    nome: '',
    cnpj: '',
    telefone: '',
    email: '',
    endereco: '',
    id_user: ''
  })

  const [mensagem, setMensagem] = useState('')
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  const token = localStorage.getItem('token')

  /* =======================
     FETCH INICIAL
  ======================= */

  useEffect(() => {
    if (!token) return

    const fetchDados = async () => {
      const [empresasRes, usuariosRes] = await Promise.all([
        axios.get('/empresa', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/user', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      setEmpresas(normalizeArray<Empresa>(empresasRes.data))
      setUsuarios(normalizeArray<Usuario>(usuariosRes.data))
    }

    fetchDados().catch(console.error)
  }, [token])

  const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: name === 'id_user' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMensagem('')

    try {
      await axios.post('/empresa', form, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setMensagem('Empresa cadastrada com sucesso!')
      setForm({
        nome: '',
        cnpj: '',
        telefone: '',
        email: '',
        endereco: '',
        id_user: ''
      })

      const response = await axios.get('/empresa', {
        headers: { Authorization: `Bearer ${token}` }
      })

      setEmpresas(normalizeArray<Empresa>(response.data))
    } catch {
      setMensagem('Erro ao cadastrar empresa.')
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja realmente deletar esta empresa?')) return

    try {
      await axios.delete(`/empresa/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setEmpresas(prev => prev.filter(e => e.id !== id))
      setMensagem('Empresa deletada com sucesso!')
    } catch {
      setMensagem('Erro ao deletar empresa.')
    }
  }

  return (
      <div className="empresa-container">
        <Navbar />

        <form className="empresa-form" onSubmit={handleSubmit}>
          <a href="/home" className="voltar">Voltar</a>
          <h2>Cadastrar Empresa</h2>

          <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome da Empresa"
              required
          />

          <input
              name="cnpj"
              value={form.cnpj}
              onChange={handleChange}
              placeholder="CNPJ"
          />

          <input
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="Telefone"
          />

          <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
          />

          <input
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
              placeholder="Endereço"
          />

          <select
              name="id_user"
              value={form.id_user}
              onChange={handleChange}
              required
          >
            <option value="">Selecione o Usuário Responsável</option>
            {usuarios.map(u => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
            ))}
          </select>

          <button type="submit">Salvar</button>

          {mensagem && <p className="mensagem">{mensagem}</p>}
        </form>

        <div className="empresa-list">
          <h2>Empresas Cadastradas</h2>

          {empresas.length === 0 ? (
              <p>Nenhuma empresa cadastrada.</p>
          ) : (
              <table>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>CNPJ</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th>Endereço</th>
                  <th>Usuário</th>
                  <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {empresas.map(e => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.nome}</td>
                      <td>{e.cnpj}</td>
                      <td>{e.telefone}</td>
                      <td>{e.email}</td>
                      <td>{e.endereco}</td>
                      <td>
                        {usuarios.find(u => u.id === e.id_user)?.nome ?? 'N/A'}
                      </td>
                      <td>
                        <button
                            onClick={() => handleDelete(e.id)}
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

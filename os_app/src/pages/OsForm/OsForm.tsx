import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent
} from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import './OsForm.css'

interface OsFormData {
  nome: string
  numero: string
  tipo_produto: string
  defeito: string
  complemento: string
  descricao: string
  valor: string
  id_cliente: number | ''
  id_tecnico: number | ''
  id_empresa: number | ''
  status: boolean
}

interface Cliente {
  id: number
  nome: string
}

interface Usuario {
  id: number
  nome: string
}

interface Empresa {
  id: number
  nome: string
}

export default function OsForm() {
  const [form, setForm] = useState<OsFormData>({
    nome: '',
    numero: '',
    tipo_produto: '',
    defeito: '',
    complemento: '',
    descricao: '',
    valor: '',
    id_cliente: '',
    id_tecnico: '',
    id_empresa: '',
    status: false
  })

  const [mensagem, setMensagem] = useState('')
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [empresas, setEmpresas] = useState<Empresa[]>([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) return

    const fetchDados = async () => {
      const [clientesRes, usuariosRes, empresasRes] = await Promise.all([
        axios.get<Cliente[]>('/cliente', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get<Usuario[]>('/user', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get<Empresa[]>('/empresa', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      setClientes(clientesRes.data)
      setUsuarios(usuariosRes.data)
      setEmpresas(empresasRes.data)
    }

    fetchDados().catch(console.error)
  }, [token])

  const handleChange = (
      e: ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }))
      return
    }

    setForm(prev => ({
      ...prev,
      [name]:
          name === 'id_cliente' ||
          name === 'id_tecnico' ||
          name === 'id_empresa'
              ? Number(value)
              : value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMensagem('')

    try {
      await axios.post('/os', form, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setMensagem('Ordem de Serviço criada com sucesso!')
      setForm({
        nome: '',
        numero: '',
        tipo_produto: '',
        defeito: '',
        complemento: '',
        descricao: '',
        valor: '',
        id_cliente: '',
        id_tecnico: '',
        id_empresa: '',
        status: false
      })
    } catch {
      setMensagem('Erro ao criar Ordem de Serviço.')
    }
  }

  return (
      <div className="os-container">
        <Navbar />

        <form className="os-form" onSubmit={handleSubmit}>
          <a href="/home" className="voltar">
            Voltar
          </a>

          <h2>Cadastrar Ordem de Serviço</h2>

          <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome da O.S."
              required
          />

          <input
              name="numero"
              value={form.numero}
              onChange={handleChange}
              placeholder="Número da O.S."
              required
          />

          <select
              name="id_cliente"
              value={form.id_cliente}
              onChange={handleChange}
              required
          >
            <option value="">Selecione o Cliente</option>
            {clientes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
            ))}
          </select>

          <select
              name="id_tecnico"
              value={form.id_tecnico}
              onChange={handleChange}
              required
          >
            <option value="">Selecione o Técnico</option>
            {usuarios.map(u => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
            ))}
          </select>

          <select
              name="id_empresa"
              value={form.id_empresa}
              onChange={handleChange}
          >
            <option value="">Selecione a Empresa</option>
            {empresas.map(e => (
                <option key={e.id} value={e.id}>
                  {e.nome}
                </option>
            ))}
          </select>

          <input
              name="tipo_produto"
              value={form.tipo_produto}
              onChange={handleChange}
              placeholder="Tipo do Produto"
          />

          <textarea
              name="defeito"
              value={form.defeito}
              onChange={handleChange}
              placeholder="Defeito informado"
          />

          <textarea
              name="complemento"
              value={form.complemento}
              onChange={handleChange}
              placeholder="Complemento"
          />

          <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder="Descrição do Serviço"
              required
          />

          <input
              type="number"
              step="0.01"
              name="valor"
              value={form.valor}
              onChange={handleChange}
              placeholder="Valor (R$)"
          />

          <label className="checkbox">
            <input
                type="checkbox"
                name="status"
                checked={form.status}
                onChange={handleChange}
            />
            Concluída
          </label>

          <button type="submit">Salvar</button>

          {mensagem && <p className="mensagem">{mensagem}</p>}
        </form>
      </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom';

import { api } from '../api'
import { toast } from 'react-toastify';

export function CreateUserPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null)

  const toastUserCraated = () => toast.success("Usuário criado com sucesso")

  function clearForm() {
    setEmail("")
    setName("")
    setPassword("")

  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password
    }


    try {
     await api.post('/user', data);
      
     toastUserCraated()

     clearForm();
  
    } catch (e) {
      setError("Error ao criar usuário")
      
    }


  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Cadastro</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Senha</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className='text-red-500'>{error}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Cadastrar
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Já tem uma conta? <Link to={"/"} className="text-blue-500 hover:underline">Faça login</Link>
        </p>
      </div>
    </div>
  )
}
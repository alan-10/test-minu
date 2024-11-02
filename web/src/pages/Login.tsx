
// import './App.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api'

import { useAuth } from '../hook/UseAuth'

export function Login() {

  const { login } = useAuth()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {

      const data = {
        email,
        password
      }

      const { data: { token } } = await api.post('/login', data);

      login(token)

      api.defaults.headers.authorization = `Bearer ${token}`

      console.log('token: ', token);

      navigate('/home')


    } catch (e) {
      setError('Error fazer login!')
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
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
              autoComplete="off"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="text-blue-500 focus:ring-blue-400" />
              <label htmlFor="remember" className="ml-2 text-gray-600">Lembrar-me</label>
            </div>
            {error && (
              <p className='text-red-500'>{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {/* Não tem uma conta? <a href="#" className="text-blue-500 hover:underline">Cadastre-se</a> */}
          Não tem uma conta?<Link className="text-blue-500 hover:underline" to={"/new-user"}>Cadastre-se</Link>
        </p>
      </div>
    </div>
  )
}



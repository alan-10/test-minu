import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './routes.tsx';
import './index.css'
import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from './hook/UseAuth'

import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(

  <StrictMode>
   <AuthProvider>
    <ToastContainer />
      <RouterProvider router={Router} />
      </AuthProvider>
    </StrictMode>,
)

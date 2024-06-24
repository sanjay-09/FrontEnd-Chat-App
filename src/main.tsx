import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
const appRouter=createBrowserRouter([
  {
    path:"/:id",
    element:<App/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
        <RouterProvider router={appRouter}/>
  
)

import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import {StepsManagement} from './pages/showForm/StepMangement'
import {StepFields} from './pages/createForm/stepFeild'
import "../src/index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <StepsManagement />
      },
      {
        path: "step/:stepId/fields",
        element: <StepFields />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

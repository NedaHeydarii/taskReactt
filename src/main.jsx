import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StepTwo } from './pages/step2/StepTwo.jsx'
import { StepOne } from './pages/step1/StepOne.jsx'



const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
          {

    path:'/step1',
     element:<StepOne/>
  },
  {
    path:"/step2",
    element:<StepTwo/>,

  }
    ]},

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
   
  </StrictMode>,
)

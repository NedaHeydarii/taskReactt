import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { FeildCard } from './components/fieldCard/FeildCard.jsx'




const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
     children:[
      // {
      //   path:"/step/:id",
      //   element:<FeildCard/>
      // }
     ]
  }
    

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
   
  </StrictMode>,
)

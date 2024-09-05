import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Template1 from './templates/Template1.jsx'
import Template2 from"./templates/Template2.jsx"
import Template3 from './templates/Template3.jsx'
import Template4 from './templates/Template4.jsx'
import Form from './pages/form.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Signin from './pages/Signin.jsx'
import CreateAccount from './pages/Createaccount.jsx'
import Templates from './pages/templates.jsx'
const router =createBrowserRouter([
  {
    path:"/template1",
    element:<Template1/>
  }
  ,
  {
    path:"/template2",
    element:<Template2/>
  },
  {
    path:"/template3",
    element:<Template3/>
  },
  {
    path:"/template4",
    element:<Template4/>
  },
  {
    path:"/form",
    element:<Form/>
  },
  {
    path:"/main",
    element:<App/>
  },
  {
    path:"/createaccount",
    element:<CreateAccount/>
  },
  {
    path:"/signin",
    element:<Signin/>
  },
  {
    path:"/templates",
    element:<Templates/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

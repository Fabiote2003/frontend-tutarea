import {BrowserRouter, Routes, Route} from "react-router-dom"

//Layout
import PrivateRoute from './layout/PrivateRoute';
import AuthLayout from "./layout/AuthLayout";

//Pages
import Login from "./pages/Login";
import Trabajos from "./pages/Trabajos";
import Register from './pages/Register'
import Perfil from "./pages/Perfil";
import NuevoTrabajo from "./pages/NuevoTrabajo";
import Trabajo from "./pages/Trabajo";
import EditarTrabajo from "./pages/EditarTrabajo";

//Provaider
import {UserProvaider} from './context/UserContext'
import {ProyectProvaider} from './context/ProyectContext'

function App() {

  return (
   <>
    <BrowserRouter>
    <UserProvaider>
      <ProyectProvaider>

      <Routes>

        <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />}/> 
              <Route path="/registro" element={<Register />} />
        </Route>

        <Route path="/trabajos" element={<PrivateRoute />}>
              <Route index element={<Trabajos />}/> 
              <Route path="/trabajos/perfil" element={<Perfil />} />
              <Route path="/trabajos/:id" element={<Trabajo />} />
              <Route path="/trabajos/nuevo-trabajo" element={<NuevoTrabajo />} />
              <Route path="/trabajos/editar-trabajo/:id" element={<EditarTrabajo />}/>
        </Route>
        
      </Routes>
      </ProyectProvaider>
    </UserProvaider>
    </BrowserRouter>
   </>
  )
}

export default App

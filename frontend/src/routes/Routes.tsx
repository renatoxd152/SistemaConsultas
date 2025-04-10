import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useAuth } from "../components/provider/RotaAutenticada"
import ConsultaCadastroPage from "../pages/cadastros/consultas"
import CadastroMedicamentoPage from "../pages/cadastros/medicamentos"
import MedicosPage from "../pages/cadastros/medicos"
import CadastroPacientePage from "../pages/cadastros/pacientes"
import CadastroUsuarioPage from "../pages/cadastros/usuarios/cadastro"
import LoginUsuarioPage from "../pages/cadastros/usuarios/login"
import ListagemConsultasPage from "../pages/consultas/consultas"
import ListagemMedicamentosPage from "../pages/consultas/medicamentos"
import MedicosListagemPage from "../pages/consultas/medicos"
import ListagemPacientesPage from "../pages/consultas/pacientes"
import RelatorioConsultasPage from "../pages/consultas/relatorios"
import { ProtectedRoute } from "./ProtectedRoute"
const AppRoutes = () =>
{
    const{token} = useAuth();

    
  const routesForPublic = [
    {
      path: "/",
      element: <LoginUsuarioPage/>,
    },
    {
      path: "/cadastro",
      element:<CadastroUsuarioPage/>,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/medicos/cadastrar",
          element: <MedicosPage/>,
        },
        {
          path: "/medicos/cadastrar/:id",
          element: <MedicosPage/>,
        },
        {
          path: "/medicos/listar",
          element: <MedicosListagemPage/>,
        },
        {
          path: "/consultas",
          element: <ConsultaCadastroPage/>,
        },
        {
          path: "/consultas/listar",
          element: <ListagemConsultasPage/>,
        },
        {
          path: "/medicamentos",
          element: <CadastroMedicamentoPage/>,
        },
        {
          path: "/medicamentos/editar/:id",
          element: <CadastroMedicamentoPage/>,
        },
        {
          path: "/medicamentos/listar",
          element: <ListagemMedicamentosPage/>,
        },
        {
          path: "/pacientes",
          element: <CadastroPacientePage/>,
        },
        {
          path: "/pacientes/editar/:id",
          element: <CadastroPacientePage/>,
        },
        {
          path: "/pacientes/listar",
          element: <ListagemPacientesPage/>,
        },
        {
          path: "/relatorios",
          element: <RelatorioConsultasPage/>,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
      ],
    },
  ];


  const routesForNotAuthenticatedOnly = [
    {
        path: "/",
        element: <LoginUsuarioPage/>,
      },
      {
        path: "/cadastro",
        element:<CadastroUsuarioPage/>,
      },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { CadastroConsulta } from "../components/consultas/cadastro"
import { CadastroMedico } from "../components/medicos/cadastro"
import { Listagem } from "../components/medicos/listagem"

const AppRoutes = () =>
{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<CadastroMedico/>} />
                <Route path="/listar" element={<Listagem/>}/>
                <Route path="/consultas" element={<CadastroConsulta/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes
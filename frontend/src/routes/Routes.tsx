import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ConsultaCadastro } from "../components"
import { ListagemConsultas } from "../components/consultas/listagem"
import { CadastroMedicamento } from "../components/medicamentos/cadastro"
import { ListagemMedicamentos } from "../components/medicamentos/listagem"
import { CadastroMedico } from "../components/medicos/cadastro"
import { Listagem } from "../components/medicos/listagem"

const AppRoutes = () =>
{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<CadastroMedico/>} />
                <Route path="/listar" element={<Listagem/>}/>
                <Route path="/consultas" element={<ConsultaCadastro/>}/>
                <Route path="/consultas/listar" element={<ListagemConsultas/>}/>
                <Route path="/medicamentos" element={<CadastroMedicamento/>}/>
                <Route path="/medicamentos/listar" element={<ListagemMedicamentos/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes
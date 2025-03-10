import * as Yup from 'yup';
const campoObrigatorioMensagem = "Campo obrigatório";

export const validationScheme = Yup.object().shape({
    idMedico:Yup.string().trim().required(campoObrigatorioMensagem),
    idPaciente:Yup.string().trim().required(campoObrigatorioMensagem),
    dataHora:Yup.string().trim().required(campoObrigatorioMensagem),
    motivoConsulta:Yup.string().trim().required(campoObrigatorioMensagem),
    tipoConsulta:Yup.string().trim().required(campoObrigatorioMensagem),
    status:Yup.string().trim().required(campoObrigatorioMensagem),
    observações:Yup.string().trim().required(campoObrigatorioMensagem),
    prescricaoMedica:Yup.string().trim().required(campoObrigatorioMensagem)
})
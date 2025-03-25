import * as Yup from 'yup';
const campoObrigatorioMensagem = "Campo obrigatório";

export const validationScheme = Yup.object().shape({
    data:Yup.string().trim().required(campoObrigatorioMensagem),
    hora:Yup.string().trim().required(campoObrigatorioMensagem),
    motivoConsulta:Yup.string().trim().required(campoObrigatorioMensagem),
    observações:Yup.string().trim().required(campoObrigatorioMensagem),
    prescricaoMedica:Yup.string().trim().required(campoObrigatorioMensagem)
})
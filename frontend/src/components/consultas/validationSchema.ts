import * as Yup from 'yup';
const campoObrigatorioMensagem = "Campo obrigatório";

export const validationScheme = Yup.object().shape({
    data:Yup.string().trim().required(campoObrigatorioMensagem),
    hora:Yup.string().trim().required(campoObrigatorioMensagem),
    motivo:Yup.string().trim().required(campoObrigatorioMensagem),
    observacoes:Yup.string().trim().required(campoObrigatorioMensagem),
    prescricaoMedica:Yup.string().trim().required(campoObrigatorioMensagem)
})
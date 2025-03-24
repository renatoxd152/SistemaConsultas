import * as Yup from 'yup';
const campoObrigatorioMensagem = "Campo obrigatório";

export const validationScheme = Yup.object().shape({
    medicamento:Yup.string().trim().required(campoObrigatorioMensagem),
})
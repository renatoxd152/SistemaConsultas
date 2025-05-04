import * as Yup from 'yup';

const campoObrigatorioMensagem = "Campo obrigatório";

export const validationScheme = Yup.object().shape({
    login: Yup.string()
        .trim()
        .required(campoObrigatorioMensagem),

    senha: Yup.string()
        .trim()
        .required(campoObrigatorioMensagem),

    senhaConfirmar: Yup.string()
        .trim()
        .required(campoObrigatorioMensagem)
        .oneOf([Yup.ref('senha')], 'As senhas devem coincidir'),

    nivel: Yup.string()
        .trim()
        .required(campoObrigatorioMensagem)
});

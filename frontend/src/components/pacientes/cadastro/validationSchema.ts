import * as yup from 'yup';
const campoObrigatorioMensagem = "Campo obrigatório";
export const validationScheme = yup.object().shape(
    {
        nome:yup.string().trim().required(campoObrigatorioMensagem),
        dataNascimento:yup.string().trim().required(campoObrigatorioMensagem).length(10,"Data Inválida"),
        cpf:yup.string().trim().required(campoObrigatorioMensagem).length(14,"O CPF está no formato errado"),
        rg:yup.string().trim().required(campoObrigatorioMensagem).length(12,"O CPF está no formato errado"),
    }
)
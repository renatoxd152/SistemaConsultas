import * as yup from 'yup';
const campoObrigatorioMensagem = "Campo obrigatório";
export const validationScheme = yup.object().shape(
    {
        nome:yup.string().trim().required(campoObrigatorioMensagem),
        dataNascimento:yup.string().trim().required(campoObrigatorioMensagem).length(10,"Data Inválida"),
        cpf:yup.string().trim().required(campoObrigatorioMensagem).length(14,"O CPF está no formato errado"),
        rg:yup.string().trim().required(campoObrigatorioMensagem).length(12,"O CPF está no formato errado"),
        endereco:yup.string().trim().required(campoObrigatorioMensagem),
        telefone:yup.string().trim().required(campoObrigatorioMensagem),
        email:yup.string().trim().required(campoObrigatorioMensagem).email("Email Inválido"),
        numeroCRM:yup.string().trim().required(campoObrigatorioMensagem),
        estadoCRM:yup.string().trim().required(campoObrigatorioMensagem),
        especialidade:yup.string().trim().required(campoObrigatorioMensagem),
        subespecialidade:yup.string().trim().required(campoObrigatorioMensagem),
        anoConclusao:yup.string().trim().required(campoObrigatorioMensagem),
    }
)
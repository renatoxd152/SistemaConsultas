import { useFormik } from "formik";
import React from "react";
import { Input } from "../../common/input";
import { Loader } from "../../loader";

interface RelatorioConsultasFormProps {
  onSubmit: (form:FormDataProps) => void;
  carregando:boolean;
}
export interface FormDataProps
{
    dataInicial:string;
    dataFinal:string;
}
export const RelatorioConsultasForm: React.FC<RelatorioConsultasFormProps> = ({
  onSubmit,carregando
}) => {
  const formScheme:FormDataProps = {
    dataInicial: "",
    dataFinal: ""
  };

  const formik = useFormik<FormDataProps>({
    onSubmit,
    initialValues: { ...formScheme }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-4 border rounded bg-light">
      <div className="mb-3">
        <p className="text-muted">
          Esse relatório é para verificar as consultas que foram realizadas em uma faixa de data escolhida.
        </p>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <Input
            id="dataInicial"
            type="date"
            name="dataInicial"
            onChange={formik.handleChange}
            TextLabel="Escolha a data inicial"
            errorClassName="text-danger small mt-1"
            value={formik.values.dataInicial}
            error={formik.errors.dataInicial}
            className=""
            inputClassName="form-control form-control-sm"
          />
        </div>
        <div className="col-md-6 mb-3">
          <Input
            id="dataFinal"
            type="date"
            name="dataFinal"
            onChange={formik.handleChange}
            TextLabel="Escolha a data final"
            errorClassName="text-danger small mt-1"
            value={formik.values.dataFinal}
            error={formik.errors.dataFinal}
            className=""
            inputClassName="form-control form-control-sm"
          />
        </div>
      </div>

      {carregando ? (
         <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
          <Loader show={carregando} />
        </div>
      ) : (
        <button type="submit" className="btn btn-primary btn-sm">
          Gerar Relatório
        </button>
      )}
    </form>
  );
};

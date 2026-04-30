"use client";
import { Layout } from "app/components/layout";
import { Input, InputCpf } from "app/components/common";
import { useFormik } from "formik";
import { Button } from "primereact/button";

interface ClienteConsultaForm {
  nome?: string;
  cpf?: string;
}
export const ListagemClientes: React.FC = () => {
  const handleSubmit = (filtro: ClienteConsultaForm) => {
    console.log(filtro);
  };

  const formik = useFormik<ClienteConsultaForm>({
    initialValues: {
      nome: "",
      cpf: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <Layout titulo="Consulta Clientes">
      <Button label="tste" />
      <form onSubmit={formik.handleSubmit}>
        <div className="columns">
          <Input
            label="Nome:"
            name="nome"
            id="nome"
            onChange={formik.handleChange}
            columnClasses="is-half"
            value={formik.values.nome}
          ></Input>
          <InputCpf
            label="CPF:"
            name="cpf"
            id="cpf"
            onChange={formik.handleChange}
            columnClasses="is-half"
            value={formik.values.cpf}
          ></InputCpf>
        </div>
        <div className="field is-grouped">
          <div className="control is-link">
            <button className="button is-success" type="submit">
              Consultar
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

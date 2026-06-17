"use client";
import { Layout } from "app/components/layout";
import { Input, InputCpf } from "app/components/common";
import { useFormik } from "formik";
import { useState } from "react";
import { Cliente } from "app/models/clientes";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface ClienteConsultaForm {
  nome?: string;
  cpf?: string;
}
export const ListagemClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: "1",
      nome: "João",
      cpf: "123.456.789-00",
      email: "joao@gmail.com",
    },
    {
      id: "2",
      nome: "Jose",
      cpf: "123.456.789-00",
      email: "jose@gmail.com",
    },
  ]);

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
      <div className="columns">
        <div className="is-full">
          <DataTable value={clientes}>
            <Column field="id" header="Código"></Column>
            <Column field="nome" header="Nome"></Column>
            <Column field="cpf" header="CPF"></Column>
            <Column field="email" header="E-mail"></Column>
          </DataTable>
        </div>
      </div>
    </Layout>
  );
};

"use client";
import { Layout } from "app/components/layout";
import { Input, InputCpf } from "app/components/common";
import { useFormik } from "formik";
import { useState } from "react";
import { Cliente } from "app/models/clientes";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Page } from "app/models/common/page";
import { useClienteService } from "app/services/cliente.service";

interface ClienteConsultaForm {
  nome?: string;
  cpf?: string;
}
export const ListagemClientes: React.FC = () => {
  const clienteService = useClienteService();
  const [clientes, setClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 0,
    totalElements: 0,
  });

  const handleSubmit = (filtro: ClienteConsultaForm) => {
    handlePageChange(null);
  };

  const formik = useFormik<ClienteConsultaForm>({
    initialValues: {
      nome: "",
      cpf: "",
    },
    onSubmit: handleSubmit,
  });

  const handlePageChange = (event: DataTablePageEvent) => {
    clienteService
      .find(
        formik.values.nome ?? "",
        formik.values.cpf ?? "",
        event.page ?? 0,
        event.rows ?? 10,
      )
      .then((response) => {
        setClientes(response);
      });
  };

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
            <button
              className="button is-success"
              type="submit"
              onClick={handleSubmit}
            >
              Consultar
            </button>
          </div>
        </div>
      </form>
      <br />
      <div className="columns">
        <div className="is-full">
          <DataTable
            value={clientes.content}
            totalRecords={clientes.totalElements}
            lazy={true}
            paginator
            first={clientes.first}
            rows={clientes.size}
            onPage={handlePageChange}
          >
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

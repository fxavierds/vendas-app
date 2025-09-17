"use client";
import { Layout } from "app/components/layout";
import { ClienteForm } from "./form";
import { Cliente } from "app/models/clientes";
import { useState } from "react";

export const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({});

  const handleSubmit = (cliente: Cliente) => {
    console.log(cliente);
  };
  return (
    <Layout titulo="Cliente">
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};

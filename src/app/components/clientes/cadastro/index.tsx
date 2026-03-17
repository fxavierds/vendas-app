"use client";
import { Layout } from "app/components/layout";
import { ClienteForm } from "./form";
import { Cliente } from "app/models/clientes";
import { useState } from "react";
import { useClienteService } from "app/services/cliente.service";

export const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({});
  const service = useClienteService();

  const handleSubmit = (cliente: Cliente) => {
    console.log(cliente);

    if (cliente.id) {
      service
        .atualizar(cliente)
        .then((response) => {
          console.log("Cliente atualizado com sucesso!", response);
          setCliente(response);
        })
        .catch((error) => {
          console.log("Erro:", error);
        });
    } else {
      service.salvar(cliente).then((response) => {
        console.log("Cliente salvo com sucesso!", response);
        setCliente(response);
      });
    }
  };
  return (
    <Layout titulo="Cliente">
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};

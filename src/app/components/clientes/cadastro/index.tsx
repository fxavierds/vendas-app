"use client";
import { Layout } from "app/components/layout";
import { ClienteForm } from "./form";
import { Cliente } from "app/models/clientes";
import { useState } from "react";
import { useClienteService } from "app/services/cliente.service";
import { Alert } from "app/components/common/message";

export const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({});
  const [mensagem, setMensagem] = useState<Array<Alert>>([]);
  const service = useClienteService();

  const handleSubmit = (cliente: Cliente) => {
    if (cliente.id) {
      service
        .atualizar(cliente)
        .then((response) => {
          setMensagem([
            {
              texto: "Cliente atualizado com sucesso!",
              tipo: "success",
            },
          ]);
          setCliente(response);
        })
        .catch((error) => {
          console.log("Erro:", error);
        });
    } else {
      service.salvar(cliente).then((response) => {
        setMensagem([
          {
            texto: "Cliente salvo com sucesso!",
            tipo: "success",
          },
        ]);
        setCliente(response);
      });
    }
  };
  return (
    <Layout titulo="Cliente" mensagens={mensagem}>
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};

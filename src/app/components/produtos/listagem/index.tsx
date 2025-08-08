"use client";
import { Layout } from "app/components/layout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TabelaProdutos } from "./tabela";
import { Produto } from "app/models/produtos";
import { Loader } from "app/components/common";
import useSWR from "swr";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useProdutoService } from "app/services/produto.service";
import { Alert } from "app/components/common/message";

export const ListagemProdutos: React.FC = () => {
  const service = useProdutoService();
  const [message, setMessage] = useState<Array<Alert>>([]);
  const router = useRouter();
  const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
    "api/produtos",
    (url: string) => httpClient.get(url)
  );

  const [lista, setLista] = useState<Produto[]>([]);

  useEffect(() => {
    setLista(result?.data || []);
  }, [result]);

  const editar = (produto: Produto) => {
    const url = `/cadastros/produtos?id=${produto.id}`;
    router.push(url);
  };

  const excluir = (produto: Produto) => {
    service.deletar(produto.id).then((response) => {
      setMessage([{ tipo: "success", texto: "Produto excluído com sucesso." }]);
      const listaAlterada: Produto[] = lista?.filter(
        (p) => p.id !== produto.id
      );
      setLista(listaAlterada);
    });
  };

  return (
    <Layout titulo="Produtos" mensagens={message}>
      <Link href="/cadastros/produtos">
        <button className="button is-warning">Novo</button>
      </Link>
      <br />
      <Loader show={!result} />
      <TabelaProdutos
        onDelete={excluir}
        onEdit={editar}
        produtos={lista}
      ></TabelaProdutos>
    </Layout>
  );
};

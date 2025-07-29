"use client";
import { Layout } from "app/components/layout";
import React from "react";
import Link from "next/link";
import { TabelaProdutos } from "./tabela";
import { Produto } from "app/models/produtos";
import { Loader } from "app/components/common";
import useSWR from "swr";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export const ListagemProdutos: React.FC = () => {
  const router = useRouter();
  const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
    "api/produtos",
    (url: string) => httpClient.get(url)
  );

  const editar = (produto: Produto) => {
    const url = `/cadastros/produtos?id=${produto.id}`;
    router.push(url);
  };

  const excluir = (produto: Produto) => {
    const url = `/cadastros/produtos?id=${produto.id}`;
    router.push(url);
  };

  return (
    <Layout titulo="Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-warning">Novo</button>
      </Link>
      <br />
      <Loader show={!result} />
      <TabelaProdutos
        onDelete={excluir}
        onEdit={editar}
        produtos={result?.data || []}
      ></TabelaProdutos>
    </Layout>
  );
};

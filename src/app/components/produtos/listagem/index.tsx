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

export const ListagemProdutos: React.FC = () => {
  const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
    "api/produtos",
    (url: string) => httpClient.get(url)
  );

  return (
    <Layout titulo="Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-warning">Novo</button>
      </Link>
      <br />
      <Loader show={!result} />
      <TabelaProdutos produtos={result?.data || []}></TabelaProdutos>
    </Layout>
  );
};

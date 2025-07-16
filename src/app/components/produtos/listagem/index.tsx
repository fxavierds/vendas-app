import { Layout } from "app/components/layout";
import React from "react";
import Link from "next/link";
import { TabelaProdutos } from "./tabela";
import { Produto } from "app/models/produtos";
import useSWR from "swr";

export const ListagemProdutos: React.FC = () => {
  const produtos: Produto[] = [
    {
      id: "01",
      sku: "444",
      preco: 500,
      nome: "teste",
    },
    {
      id: "01",
      sku: "444",
      preco: 500,
      nome: "teste",
    },
    {
      id: "01",
      sku: "444",
      preco: 500,
      nome: "teste",
    },
  ];
  return (
    <Layout titulo="Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-warning">Novo</button>
      </Link>
      <br />
      <TabelaProdutos produtos={produtos}></TabelaProdutos>
    </Layout>
  );
};

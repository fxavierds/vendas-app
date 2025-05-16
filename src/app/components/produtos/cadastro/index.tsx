"use client";
import { useState } from "react";
import { Layout } from "app/components/layout";
import { Input } from "app/components/common";
import { useProdutoService } from "app/services/produto.service";
import { Produto } from "app/models/produtos";

export const CadastroProduto: React.FC = () => {
  const servvice = useProdutoService();
  const [sku, setSku] = useState("");
  const [preco, setPreco] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const submit = () => {
    const produto: Produto = {
      sku,
      nome,
      preco: parseFloat(preco),
      descricao,
    };
    servvice
      .salvar(produto)
      .then((produtoResposta) => console.log(produtoResposta));
  };

  return (
    <Layout titulo="Cadastro de Produtos">
      <div className="columns">
        <Input
          id="inputSku"
          label="SKU: *"
          columnClasses="is-half"
          onChange={setSku}
          value={sku}
          placeholder="Digite o SKU"
        />
        <Input
          id="inputPreco"
          label="Preço: *"
          columnClasses="is-half"
          onChange={setPreco}
          value={preco}
          placeholder="Digite o Preço"
        />
      </div>
      <div className="columns">
        <Input
          id="inputNome"
          label="Nome: *"
          columnClasses="is-half"
          onChange={setNome}
          value={preco}
          placeholder="Digite o Nome"
        />
      </div>
      <div className="columns">
        <div className="field column is-full">
          <label className="label" htmlFor="inputDesc">
            Descrição: *
          </label>
          <div className="control">
            <textarea
              className="textarea is-fullwidth"
              rows={6}
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              id="inputDesc"
              placeholder="Digite a descrição detalhada do produto"
            />
          </div>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button" onClick={submit}>
            Salvar
          </button>
        </div>
        <div className="control">
          <button className="button">Voltar</button>
        </div>
      </div>
    </Layout>
  );
};

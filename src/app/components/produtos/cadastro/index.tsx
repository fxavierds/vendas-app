"use client";
import { useState } from "react";
import { Layout } from "app/components/layout";
import { Input } from "app/components/common";
import { useProdutoService } from "app/services/produto.service";
import { Produto } from "app/models/produtos";
import { convertBigEmDecimal } from "app/util/money";

export const CadastroProduto: React.FC = () => {
  const servvice = useProdutoService();
  const [sku, setSku] = useState("");
  const [preco, setPreco] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id, setId] = useState<string>("");
  const [cadastro, setCadastro] = useState<string>("");

  const submit = () => {
    const produto: Produto = {
      id,
      sku,
      nome,
      preco: convertBigEmDecimal(preco),
      descricao,
      cadastro,
    };

    if (id) {
      servvice.atualizar(produto).then((response) => console.log("Atualizado"));
    } else {
      servvice.salvar(produto).then((produtoResposta) => {
        console.log("retorno", produtoResposta);
        setId(produtoResposta.id ?? "");
        setCadastro(produtoResposta.cadastro ?? "");
      });
    }
  };

  return (
    <Layout titulo="Cadastro de Produtos">
      {id && (
        <div className="columns">
          <Input
            id="inputId"
            label="Código"
            columnClasses="is-half"
            value={id}
            disabled
          />
          <Input
            id="inputCadastro"
            label="Data de Cadastro"
            columnClasses="is-half"
            value={cadastro}
            disabled
          />
        </div>
      )}
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
          currency
          maxLength={16}
          placeholder="Digite o Preço"
        />
      </div>
      <div className="columns">
        <Input
          id="inputNome"
          label="Nome: *"
          columnClasses="is-half"
          onChange={setNome}
          value={nome}
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
            {id ? "Atualizar" : "Salvar"}
          </button>
        </div>
        <div className="control">
          <button className="button">Voltar</button>
        </div>
      </div>
    </Layout>
  );
};

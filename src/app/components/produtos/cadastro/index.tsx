"use client";
import { useState } from "react";
import { Layout } from "app/components/layout";
import { Input, Message } from "app/components/common";
import { useProdutoService } from "app/services/produto.service";
import { Produto } from "app/models/produtos";
import { convertBigEmDecimal, formatReal } from "app/util/money";
import { Alert } from "app/components/common/message";
import * as yup from "yup";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const msgObrigatorio = "Campo obrigatório";

const validationSchema = yup.object().shape({
  sku: yup.string().trim().required(msgObrigatorio),
  nome: yup.string().trim().required(msgObrigatorio),
  descricao: yup
    .string()
    .trim()
    .required(msgObrigatorio)
    .min(10, "Minimo de 10 caracteres"),
  preco: yup
    .number()
    .required(msgObrigatorio)
    .moreThan(0, "Valor deve ser maior que 0"),
});

interface formErros {
  sku?: string;
  nome?: string;
  descricao?: string;
  preco?: string;
}

export const CadastroProduto: React.FC = () => {
  const service = useProdutoService();
  const [sku, setSku] = useState("");
  const [preco, setPreco] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id, setId] = useState("");
  const [cadastro, setCadastro] = useState<string>("");
  const [message, setMessage] = useState<Array<Alert>>([]);
  const [errors, setErrors] = useState<formErros>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");

  useEffect(() => {
    if (queryId) {
      service.carregarProduto(queryId).then((produtoEncontrado) => {
        setId(produtoEncontrado.id ?? "");
        setSku(produtoEncontrado.sku ?? "");
        setDescricao(produtoEncontrado.descricao ?? "");
        setNome(produtoEncontrado.nome ?? "");
        setPreco(formatReal(`${produtoEncontrado.preco}`));
        setCadastro(produtoEncontrado.cadastro ?? "");
      });
    }
  }, [queryId]);

  const submit = () => {
    const produto: Produto = {
      id,
      sku,
      nome,
      preco: convertBigEmDecimal(preco),
      descricao,
      cadastro,
    };

    validationSchema
      .validate(produto)
      .then((obj) => {
        if (id) {
          service.atualizar(produto).then((response) => {
            setMessage([
              {
                texto: "Produto Atualizado com sucesso",
                tipo: "success",
              },
            ]);
          });
        } else {
          service.salvar(produto).then((produtoResposta) => {
            setErrors([]);
            setId(produtoResposta.id ?? "");
            setCadastro(produtoResposta.cadastro ?? "");
            setMessage([
              {
                texto: "Produto Salvo com sucesso",
                tipo: "success",
              },
            ]);
          });
        }
      })
      .catch((err) => {
        const field = err.path;
        const message = err.message;

        setErrors({ [field]: message });
      });
  };

  return (
    <Layout titulo="Cadastro de Produtos" mensagens={message}>
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
          error={errors.sku}
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
          error={errors.preco}
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
          error={errors.nome}
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
            {errors.descricao && (
              <p className="help is-danger">{errors.descricao}</p>
            )}
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
          <Link href="/consultas/produtos">
            <button className="button">Voltar</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

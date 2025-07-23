import { Produto } from "app/models/produtos";

interface TabelaProps {
  produtos: Array<Produto>;
}

export const TabelaProdutos: React.FC<TabelaProps> = ({ produtos }) => {
  return (
    <table className="table is-striped">
      <thead>
        <tr>
          <th>Código</th>
          <th>SKU</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <ProdutoRow key={produto.id} produto={produto} />
        ))}
      </tbody>
    </table>
  );
};

interface ProdutoRowProps {
  produto: Produto;
  onEdit: (produto: any) => void;
  onDelete: (produto: any) => void;
}
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({ produto }) => {
  return (
    <tr>
      <td>{produto.id}</td>
      <td>{produto.sku}</td>
      <td>{produto.nome}</td>
      <td>{produto.preco}</td>
      <td>
        <button className="button is-success is-rounded is-small">
          Editar
        </button>
        <button className="button is-danger is-rounded is-small">
          Deletar
        </button>
      </td>
    </tr>
  );
};

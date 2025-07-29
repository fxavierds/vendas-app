import { Produto } from "app/models/produtos";

interface TabelaProps {
  produtos: Array<Produto>;
  onEdit: (produto: any) => void;
  onDelete: (produto: any) => void;
}

export const TabelaProdutos: React.FC<TabelaProps> = ({
  produtos,
  onDelete,
  onEdit,
}) => {
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
          <ProdutoRow
            onDelete={onDelete}
            onEdit={onEdit}
            key={produto.id}
            produto={produto}
          />
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

const ProdutoRow: React.FC<ProdutoRowProps> = ({
  produto,
  onDelete,
  onEdit,
}) => {
  return (
    <tr>
      <td>{produto.id}</td>
      <td>{produto.sku}</td>
      <td>{produto.nome}</td>
      <td>{produto.preco}</td>
      <td>
        <button
          onClick={(e) => onEdit(produto)}
          className="button is-success is-rounded is-small"
        >
          Editar
        </button>
        <button
          onClick={(e) => onDelete(produto)}
          className="button is-danger is-rounded is-small"
        >
          Deletar
        </button>
      </td>
    </tr>
  );
};

import { Cliente } from "app/models/clientes";
import { useFormik } from "formik";
import {
  Input,
  InputCpf,
  InputTelefone,
  InputDate,
} from "app/components/common";

interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
  cadastro: "",
  cpf: "",
  dataNascimento: "",
  email: "",
  endereco: "",
  id: "",
  nome: "",
  telefone: "",
};

export const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit,
}) => {
  const formik = useFormik<Cliente>({
    initialValues: { ...formScheme, ...cliente },
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.id && (
        <div className="columns">
          <Input
            id="id"
            name="id"
            disabled
            value={formik.values.id}
            onChange={formik.handleChange}
            label="Código Cliente"
          ></Input>
          <Input
            id="dataCadastro"
            name="dataCadastro"
            disabled
            value={formik.values.cadastro}
            onChange={formik.handleChange}
            label="Data de Cadastro"
          ></Input>
        </div>
      )}
      <div className="columns">
        <Input
          id="nome"
          name="nome"
          value={formik.values.nome}
          onChange={formik.handleChange}
          label="Nome"
        ></Input>
      </div>
      <div className="columns">
        <InputCpf
          id="cpf"
          name="cpf"
          value={formik.values.cpf}
          onChange={formik.handleChange}
          label="CPF"
        ></InputCpf>
        <InputDate
          id="dataNascimento"
          name="dataNascimento"
          value={formik.values.dataNascimento}
          onChange={formik.handleChange}
          label="Data de Nascimento"
        ></InputDate>
      </div>
      <div className="columns">
        <Input
          id="endereco"
          name="endereco"
          value={formik.values.endereco}
          onChange={formik.handleChange}
          label="Endereço"
        ></Input>
      </div>
      <div className="columns">
        <Input
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="Email"
        ></Input>
        <InputTelefone
          id="telefone"
          name="telefone"
          value={formik.values.telefone}
          onChange={formik.handleChange}
          label="Telefone"
        ></InputTelefone>
      </div>
      <div className="field is-grouped">
        <div className="control is-link">
          <button className="button" type="submit">
            {formik.values.id ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
};

import { Cliente } from "app/models/clientes";
import { useFormik } from "formik";
import {
  Input,
  InputCpf,
  InputTelefone,
  InputDate,
} from "app/components/common";
import * as yup from "yup";

interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
  dataCadastro: "",
  cpf: "",
  dataNascimento: "",
  email: "",
  endereco: "",
  id: "",
  nome: "",
  telefone: "",
};

const validationSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório").length(14, "CPF inválido"),
  dataNascimento: yup
    .string()
    .required("Data de Nascimento é obrigatória")
    .length(10, "Data inválida"),
  endereco: yup.string().required("Endereço é obrigatório"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  telefone: yup.string().required("Telefone é obrigatório"),
});

export const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit,
}) => {
  const formik = useFormik<Cliente>({
    initialValues: { ...formScheme, ...cliente },
    onSubmit,
    enableReinitialize: true,
    validationSchema,
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
            value={formik.values.dataCadastro}
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
          error={formik.errors.nome}
        ></Input>
      </div>
      <div className="columns">
        <InputCpf
          id="cpf"
          name="cpf"
          value={formik.values.cpf}
          onChange={formik.handleChange}
          label="CPF"
          error={formik.errors.cpf}
        ></InputCpf>
        <InputDate
          id="dataNascimento"
          name="dataNascimento"
          value={formik.values.dataNascimento}
          onChange={formik.handleChange}
          label="Data de Nascimento"
          error={formik.errors.dataNascimento}
        ></InputDate>
      </div>
      <div className="columns">
        <Input
          id="endereco"
          name="endereco"
          value={formik.values.endereco}
          onChange={formik.handleChange}
          label="Endereço"
          error={formik.errors.endereco}
        ></Input>
      </div>
      <div className="columns">
        <Input
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="Email"
          error={formik.errors.email}
        ></Input>
        <InputTelefone
          id="telefone"
          name="telefone"
          value={formik.values.telefone}
          onChange={formik.handleChange}
          label="Telefone"
          error={formik.errors.telefone}
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

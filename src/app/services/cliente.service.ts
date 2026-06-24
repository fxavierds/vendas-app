import { httpClient } from "app/http";
import { Cliente } from "app/models/clientes";
import { Page } from "app/models/common/page"

const resourceUrl: string = '/api/clientes';

export const useClienteService = () => {
    const salvar = async (cliente: Cliente): Promise<Cliente> => {
        const response = await httpClient.post<Cliente>(resourceUrl, cliente);
         console.log("salvar", response);
        return response.data;
    }

    const atualizar = async (cliente: Cliente): Promise<Cliente> => {
        const url: string = `${resourceUrl}/${cliente.id}`;
        const response = await httpClient.put(url, cliente);
        console.log("put", response);
        return response.data;
    }

    const carregarCliente = async (id: any): Promise<Cliente> => {
         const url: string = `${resourceUrl}/${id}`;
         const response = await httpClient.get<Cliente>(url)
         return response.data;
    }

    const deletar = async (id: any): Promise<void> => {
         const url: string = `${resourceUrl}/${id}`;
         await httpClient.delete(url)
    }

    const find =  async (
        nome: string = '',
        cpf: string = '',
        page: number = 0,
        size: number = 10
    ) : Promise<Page<Cliente>> => {
        const url = `${resourceUrl}?nome=${nome}&cpf=${cpf}&page=${page}&size=${size}`
        const response = await httpClient.get<Page<Cliente>>(url)
        return response.data;
    }

    return {
        salvar, atualizar, carregarCliente, deletar, find
    }
}
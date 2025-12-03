import api from './api';
import { buscaTransacoes } from './transacoes';

jest.mock('./api');

const mockTransacao = {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '03/12/2025',
    mes: 'Dezembro',
};

const mockRequisicao = (retorno) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: retorno,
            });
        }, 200);
    });
};

const mockRequisicaoErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject();
        }, 200);
    });
};

describe('Requisições para a API', () => {
    test('Deve retornar uma lista de transações', async () => {
        api.get.mockImplementation(() => mockRequisicao(mockTransacao));

        const transacoes = await buscaTransacoes();
        expect(transacoes).toEqual(mockTransacao);
    });

    test('Deve retornar uma lista vazia quando a requisição falhar', async () => {
        api.get.mockImplementation(() => mockRequisicaoErro());

        const transacoes = await buscaTransacoes();
        expect(transacoes).toEqual([]);
    });
});

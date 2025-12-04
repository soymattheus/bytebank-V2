import api from './api';
import { buscaTransacoes, salvaTransacao } from './transacoes';
import { buscaSaldo, atualizaSaldo } from './saldo';

jest.mock('./api');

const mockRequisicao = (retorno) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: retorno,
            });
        }, 200);
    });
};

const mockRequisicaoPost = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 201,
            });
        }, 200);
    });
};

const mockRequisicaoPostErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject();
        }, 200);
    });
};

const mockTransacao = {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '03/12/2025',
    mes: 'Dezembro',
};

const mockRequisicaoErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject();
        }, 200);
    });
};

const mockSaldo = {
    valor: 1000,
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

    test('Deve retornar o saldo', async () => {
        api.get.mockImplementation(() => mockRequisicao(mockSaldo));

        const saldo = await buscaSaldo();
        expect(saldo).toEqual(mockSaldo.valor);
    });

    test('Deve retornar erro do saldo', async () => {
        api.get.mockImplementation(() => mockRequisicaoErro(mockSaldo));

        const saldo = await buscaSaldo();
        expect(saldo).toEqual(1000);
    });

    test('Deve retornar um status 201 - (Created) após uma requisição POST', async () => {
        api.post.mockImplementation(() => mockRequisicaoPost());
        const status = await salvaTransacao(mockTransacao);
        expect(status).toBe(201);
        expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao);
    });

    test('Deve retornar um saldo de 1000 quando a requisição POST falhar', async () => {
        api.post.mockImplementation(() => mockRequisicaoPostErro());
        const status = await salvaTransacao(mockTransacao[0]);
        expect(status).toBe('Erro na requisição');
        expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
    });

    test('Deve atualizar o saldo', async () => {
        api.put.mockImplementation(() => mockRequisicaoPost());
        const status = await atualizaSaldo(mockSaldo.valor);
        expect(status).toBe(201);
    });

    test('Deve retornar erro no atualizar saldo', async () => {
        api.put.mockImplementation(() => mockRequisicaoPostErro());
        const status = await atualizaSaldo(mockSaldo.valor);
        expect(status).toBe('Erro na requisição');
    });
});

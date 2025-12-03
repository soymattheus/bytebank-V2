import { renderHook, act } from '@testing-library/react';
import { buscaTransacoes } from '../services/transacoes';
import useListaTransacoes from './useListaTransacoes';

jest.mock('../services/transacoes');

const mockTransacao = {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '03/12/2025',
    mes: 'Dezembro',
};

describe('hooks/useListaTransacoes.js', () => {
    test('Deve retornar uma lista de trnasações e uma gunção que a atualiza', async () => {
        buscaTransacoes.mockImplementation(() => mockTransacao);

        const { result } = renderHook(() => useListaTransacoes());
        expect(result.current[0]).toEqual([]);

        await act(async () => {
            result.current[1]();
        });

        expect(result.current[0]).toEqual(mockTransacao);
    });
});

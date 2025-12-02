import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppRoutes from '../../routes';

describe('Componente <App/>', () => {
    test('Deve permitir adcionar uma transação no componente extrato.', () => {
        render(<App />, { wrapper: BrowserRouter });

        const select = screen.getByRole('combobox');
        const campoValor = screen.getByPlaceholderText('Digite um valor');
        const botao = screen.getByRole('button');

        userEvent.selectOptions(select, ['Depósito']);
        userEvent.type(campoValor, '100');
        userEvent.click(botao);

        const novaTransacao = screen.getByTestId('lista-transacoes');
        const itemExtrato = screen.getByRole('listitem');

        expect(novaTransacao).toContainElement(itemExtrato);
    });

    test('Deve navegar até a página correspondente ao link clicado', () => {
        render(<AppRoutes />, { wrapper: BrowserRouter });

        const cartoesLink = screen.getByText('Cartões');
        expect(cartoesLink).toBeInTheDocument();

        userEvent.click(cartoesLink);

        const paginaCartoes = screen.getByText('Meus cartões');
        expect(paginaCartoes).toBeInTheDocument();
    });
});

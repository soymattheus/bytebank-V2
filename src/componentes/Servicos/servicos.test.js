import { render, screen } from '@testing-library/react';
import Servicos from './index';

test('Deve renderizar a lista de serviços', () => {
    render(<Servicos />);
    const listaServicos = screen.getAllByTestId('servico');
    expect(listaServicos).toHaveLength(6);
});

import { render, screen } from '@testing-library/react';
import Icone from './index';
import estilos from '../Servicos.module.css';

test('Deve renderizar o componente <Icone />', () => {
    const icone = {
        imagem: '',
        servico: 'Pix',
    };

    render(<Icone estilos={estilos} icone={icone} />);

    const servico = screen.getByTestId('servico');
    expect(servico).toHaveTextContent('Pix');
});

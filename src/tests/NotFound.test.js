import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import PageNotFound from '../pages/NotFound';

describe('Testa o componente <Not Found />', () => {
  test('Testa se a pagina About possui informações sobre a pokedéx', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <PageNotFound />
      </Router>,
    );
    const title = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    const img = screen.getByRole('img', { name: 'Pikachu crying because the page requested was not found' });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(title).toBeInTheDocument();
  });
});

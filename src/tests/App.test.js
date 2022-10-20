import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testa o componente <App.js />', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const home = screen.getByRole('link', { name: /Home/ });
    const about = screen.getByRole('link', { name: /About/ });
    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/ });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });
  test('Testa o link Home', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const home = screen.getByRole('link', { name: /Home/ });
    userEvent.click(home);
    const titleOnPage = screen.getByRole('heading', { level: 2 });
    expect(titleOnPage).toHaveTextContent('Encountered pokémons');
  });
  test('Testa o link About', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const about = screen.getByRole('link', { name: /About/ });
    userEvent.click(about);
    const titleOnPage = screen.getByRole('heading', { level: 2 });
    expect(titleOnPage).toHaveTextContent('About Pokédex');
  });
  test('Testa o link Favorite', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/ });
    userEvent.click(favoritePokemons);
    const titleOnPage = screen.getByRole('heading', { level: 2 });
    expect(titleOnPage).toHaveTextContent('Favorite pokémons');
  });
  test('Testa a pagina Not Found', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Encountered pokémons');
    history.push('/tiago-alves');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/tiago-alves');
  });
});

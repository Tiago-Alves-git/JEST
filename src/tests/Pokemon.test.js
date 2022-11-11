import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica a Função Pokemon', () => {
  test('Verifica a exibição das propriedades do Pokemon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    /* expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite'); */
  });

  test('Testa o Link Mais Detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Todos Pokemons Favoritos tem estrela', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/pokemons/25'));

    const favChecked = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favChecked);

    const favoritesPokemons = screen.getAllByRole('img');
    expect(favoritesPokemons[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(favoritesPokemons[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

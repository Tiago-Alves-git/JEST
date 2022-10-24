import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Testa o componente FavoritePokemons', () => {
  it(
    'Testa se é exibida a mensagem "No Favorite Pokemon found" caso não haja favoritos',
    () => {
      renderWithRouter(<FavoritePokemons />);
      screen.getByText(/no favorite pokemon found/i);
    },
  );

  it('Testa se são exibidos todos os cards de pokémons favoritados', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/pokemons/25'));
    const checkbox = await screen.findByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checkbox);
    act(() => history.push('/favorites'));
    screen.getByText(/pikachu/i);
    // screen.logTestingPlaygroundURL();
  });
});

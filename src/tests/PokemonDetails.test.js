import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste do componente PokemonDetails', () => {
  it('Testa se as informações detalhadas são mostradas na tela', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    screen.getByRole('heading', { name: /pikachu details/i });
    expect(details).not.toBeInTheDocument();

    screen.getByRole('heading', { name: /summary/i });

    screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
  });
  it('Testa se existe na página uma seção com os mapas contendo a localização do pokémon exibido', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    screen.getByRole('heading', { name: /game locations of pikachu/i });
    screen.getByText(/kanto viridian forest/i);
    screen.getByText(/kanto power plant/i);

    const imgs = screen.getAllByRole('img', {
      name: /pikachu location/i,
    });
    expect(imgs[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgs[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Testa se é possível favoritar um pokémon atráves da página de detalhes', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    userEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente <Pokedex />', () => {
  test('Testa se a pagina pokedex possui o titulo Encountered Pokémons', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const title = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const botao = screen.getByRole('button', { name: 'Próximo pokémon' });
    const Pikachu = screen.getByText('Pikachu');
    expect(botao).toBeInTheDocument();
    pokemons.forEach((_valor, index, array) => {
      if (index === array.length - 1) {
        userEvent.click(botao);
        expect(Pikachu).toBeInTheDocument();
      }
      if (index < array.length - 2) {
        userEvent.click(botao);
        screen.getByText(array[index + 1].name);
      }
    });
  });
  test('Testa se existe botão de filtragem para cada tipo de pokemon', () => {
    renderWithRouter(<App />);
    const typesOnScreen = screen.queryAllByTestId('pokemon-type-button');
    typesOnScreen.forEach((e) => {
      screen.getByRole('button', { name: e.innerHTML });
    });
  });
  test('Testa se ao clicar no botão de filtragem exibe os pokemons corretamente', () => {
    renderWithRouter(<App />);
    const nextPkm = screen.getByRole('button', { name: /próximo pokémon/i });
    const typeFire = screen.getByRole('button', { name: /fire/i });
    const typePoison = screen.getByRole('button', { name: /poison/i });
    const typeAll = screen.getByTestId('');

    userEvent.click(typeFire);
    screen.getByText(/charmander/i);
    userEvent.click(nextPkm);
    screen.getByText(/rapidash/i);
    userEvent.click(typePoison);
    screen.getByText(/ekans/i);
    expect(nextPkm).toHaveAttribute('disabled');
    expect(typeAll).toBeInTheDocument();
  });
  test('Testa se existe um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const typeAll = screen.getByTestId('');
    const nextPkm = screen.getByRole('button', { name: /próximo pokémon/i });
    const typeFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(typeFire);
    userEvent.click(typeAll);
    userEvent.click(nextPkm);
    screen.getByText(/charmander/i);
  });
  test('Testa se ao carregar a página o filtro selecionado é o All', () => {
    renderWithRouter(<App />);
    const nextPkm = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPkm);
    screen.getByText(/charmander/i);
    userEvent.click(nextPkm);
    screen.getByText(/caterpie/i);
  });
});

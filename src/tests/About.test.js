import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import About from '../pages/About';

describe('Testa o componente <About />', () => {
  test('Testa se a pagina About possui informações sobre a pokedéx', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const about = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    expect(about).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const favoritePokemons = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(favoritePokemons).toBeInTheDocument();
  });
  test('Teste se há 2 paragrafos na pagina About', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const numOfPara = document.querySelectorAll('p');
    expect(numOfPara.length).toEqual(2);
    numOfPara.forEach((para) => {
      expect(para).toBeInTheDocument();
    });
  });

  test('Teste se a página contém a imagem', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

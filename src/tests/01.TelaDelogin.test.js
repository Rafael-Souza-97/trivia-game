import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import fetchTrivia from '../services/fetchs/fetchTrivia';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a tela de login', () => {
  const emailTest = 'trybe@teste.com';
  it('Verifica se a tela de login contém os inputs necessários', () => {
    renderWithRouterAndRedux(<App />);

    const btn = screen.getByRole('button', { name: 'Play' });
    const inputName = screen.getByPlaceholderText('Seu Nome');
    const inputEmail = screen.getByPlaceholderText('Seu Email');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it('Verifica se o botão de configuração redireciona para a rota /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btn1 = screen.getByRole('button', { name: 'Configurações' });

    userEvent.click(btn1);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/settings');
  });

  it('Verifica se o botão Play é habilitado quando os inputs são preenchidos', () => {
    renderWithRouterAndRedux(<App />);

    const btn = screen.getByRole('button', { name: 'Play' });
    const inputName = screen.getByPlaceholderText('Seu Nome');
    const inputEmail = screen.getByPlaceholderText('Seu Email');

    expect(btn).toBeDisabled();

    userEvent.type(inputName, 'Tinoco');
    userEvent.type(inputEmail, emailTest);

    expect(btn).not.toBeDisabled();
  });

  it('Verifica se ao clicar no botão Play, é redirecionado a rota /game', () => {
    renderWithRouterAndRedux(<App />);

    const btn = screen.getByRole('button', { name: 'Play' });
    const inputName = screen.getByPlaceholderText('Seu Nome');
    const inputEmail = screen.getByPlaceholderText('Seu Email');

    userEvent.type(inputName, 'Tinoco');
    userEvent.type(inputEmail, emailTest);
    userEvent.click(btn);
  });

  it('Verifica se a API é chamado ao clicar no botão de Play', async () => {
    renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button', { name: 'Play' });
    const inputName = screen.getByPlaceholderText('Seu Nome');
    const inputEmail = screen.getByPlaceholderText('Seu Email');

    userEvent.type(inputName, 'Tinoco');
    userEvent.type(inputEmail, emailTest);
    userEvent.click(btn);

    await fetchTrivia();
  });
});

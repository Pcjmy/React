import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const username = 'Pcjmy';

test('renders learn react link', () => {
  render(<App username={username}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

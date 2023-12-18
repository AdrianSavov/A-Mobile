import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders NotFound component', () => {
  render(
    <Router>
      <NotFound />
    </Router>
  );

  // Check if the component renders without crashing
  const headingElement = screen.getByText(/404/i);
  expect(headingElement).toBeInTheDocument();

  const notFoundTextElement = screen.getByText(/Not Found/i);
  expect(notFoundTextElement).toBeInTheDocument();

  const universeTextElement = screen.getByText(/The page you are looking for might be in another universe/i);
  expect(universeTextElement).toBeInTheDocument();

  // Check if the "Go Home" link is present and has the correct path
  const goHomeLinkElement = screen.getByRole('link', { name: /Go Home/i });
  expect(goHomeLinkElement).toBeInTheDocument();
  expect(goHomeLinkElement).toHaveAttribute('href', '/');
});

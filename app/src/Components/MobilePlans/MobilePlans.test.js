import { render, screen } from '@testing-library/react';
import MobilePlans from './MobilePlans';

test('renders MobilePlans component', () => {
  render(<MobilePlans />);

  // Check if the component renders without crashing
  const headerElement = screen.getByText(/You can choose the conditions that suit you/i);
  expect(headerElement).toBeInTheDocument();
  const headerElementTwo = screen.getByText(/Do not forget to ask our consultants for more information!/i);
  expect(headerElementTwo).toBeInTheDocument();

});


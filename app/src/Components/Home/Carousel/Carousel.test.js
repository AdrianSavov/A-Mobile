import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';

test('Renders CarouselItem component', () => {
  render(<Carousel />);

  // Test for the presence of carousel text
  const carouselHeaderText = screen.getByText('BLACK FRIDAY');
  const carouselPercentText = screen.getByText('-70%');
  expect(carouselHeaderText).toBeInTheDocument();
  expect(carouselPercentText).toBeInTheDocument();

  const carouselCaption = screen.getByText('Why to choice us?');
  expect(carouselCaption).toBeInTheDocument();

});
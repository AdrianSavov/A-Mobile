import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('Renders Footer component', () => {
    render(<Footer />);
    
    // Test for the presence of the footer header
    const footerHeader = screen.getByText('More Information');
    expect(footerHeader).toBeInTheDocument();

    // Test for the presence of card title and text
    const cardTitle = screen.getByText('All Rights Reserved ©');
    const cardText = screen.getByText('This is a project to defence developed by A.Savov - SoftUni student.');
    expect(cardTitle).toBeInTheDocument();
    expect(cardText).toBeInTheDocument();
});

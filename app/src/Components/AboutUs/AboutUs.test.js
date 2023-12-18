import {render , screen} from '@testing-library/react';
import AboutUs from './AboutUs';

test('To have Who We Are text', () => {
    render(<AboutUs />)

    const headingEl = screen.getByText('Who We Are');
    expect(headingEl).toBeInTheDocument();
})

test('To have Milestones list', () => {
    render(<AboutUs />);
    
    const milestonesList = screen.getByText('Milestones').nextElementSibling;
    const milestones = ['Established in 2003 year', 'Launched our first smart device in 2007 year', 'Reached 100,000 satisfied customers in 2011 year', '20 years on the global market'];

    milestones.forEach((milestone) => {
        const milestoneItem = screen.getByText(milestone);
        expect(milestoneItem).toBeInTheDocument();
    });
});

test('To have Contacts information', () => {
    render(<AboutUs />);
    
    const phones = screen.getByText('Phones: +359 888 888 888 +359 999 999 999');
    const email = screen.getByText('Email: contact@a-mobile.com');
    const address = screen.getByText('Address: Sofia, Ivan Vazov, ul. Balsha 25');

    expect(phones).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(address).toBeInTheDocument();
});

test('To have Our Mission section', () => {
    render(<AboutUs />);
    
    const missionHeading = screen.getByText('Our Mission');
    const missionText = screen.getByText('Our mission is to empower individuals and businesses through innovative smart solutions. We strive to create products that enhance efficiency, connectivity, and overall quality of life.');

    expect(missionHeading).toBeInTheDocument();
    expect(missionText).toBeInTheDocument();
});

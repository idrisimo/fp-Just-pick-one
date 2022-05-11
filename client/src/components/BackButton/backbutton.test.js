/* @jest-environment jsdom */
import { BackButton } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


describe('BackButton', () => {
    beforeEach(() => {
        render(<BackButton />, { wrapper: MemoryRouter });
    })

    test('renders a button', () => {
        const btn = screen.getByRole('button')
        expect(btn.textContent).toContain('Go Back');
    })

})
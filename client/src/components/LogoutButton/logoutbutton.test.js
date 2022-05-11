import { LogoutButton } from '.';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


describe('Logout', () => {
    beforeEach(() => {
        render(<LogoutButton />, { wrapper: MemoryRouter });
    })

    test('renders a button', () => {
        const logoutBtn = screen.getByRole('button')
        expect(logoutBtn).toHaveValue('Logout');
    })
})
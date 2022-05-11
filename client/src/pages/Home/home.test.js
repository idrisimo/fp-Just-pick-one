/* @jest-environment jsdom */
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Home } from '.';
import axios from 'axios'
import { NavButton } from '../../components';

const mockNavigate = jest.fn();

describe('Home page navigation', () => {

    
    beforeEach(() => {
        render (<Home />, {wrapper: MemoryRouter})
    })

 
    test('login button takes you to login page', async() => {
        const login = screen.getByRole('button', {name: /Login/i})
        await waitFor(() => userEvent.click(login))
        expect(mockNavigate).toHaveBeenCalled()
    })

})

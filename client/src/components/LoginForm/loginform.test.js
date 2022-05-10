/* @jest-environment jsdom */
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { LoginForm } from './index'
import { loginFunction } from '../../actions';
import axios from 'axios'


describe('LoginForm', () => {

    const onSubmit = jest.fn()

    beforeEach(() => {
        render (<LoginForm />, {wrapper: MemoryRouter})
    })

    test('it renders a form', () => {
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    })

    test('updates password state on user typing', async() => {
        const password =  screen.getByLabelText('Password')
        await waitFor(()=>userEvent.type(password, 'h'))
        expect(password).toHaveValue('h')
        await waitFor(()=>userEvent.type(password, 'e'))
        expect(password.value).toBe('he')
    })

  
    test('password validation checker turns green when at least 8 characters are entered', () => {
        
    })

    test('onSubmit is called when submit button is clicked', async() => {
        await waitFor(()=>userEvent.click(screen.getByRole('button')))
        expect(onSubmit).toHaveBeenCalledTimes(1)
        
    })

})



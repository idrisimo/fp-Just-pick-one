/* @jest-environment jsdom */
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { EditForm } from './index'



describe('Edit Form', () => {

    beforeEach(() => {
        render (<EditForm />, {wrapper: MemoryRouter})
    })

    test('it renders a form', () => {
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    })

    test('it checks a checkbox', () => {
        const check = screen.getByDisplayValue('878')
        userEvent.click(check)
        expect(check).toBeChecked();
    })

    test('it checks multiple checkboxes', () => {
        const check1 = screen.getByDisplayValue('337')
        const check2 = screen.getByDisplayValue('350')
        userEvent.click(check1)
        userEvent.click(check2)
        expect(check1).toBeChecked();
        expect(check2).toBeChecked();
    })

})
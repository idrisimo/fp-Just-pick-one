/* @jest-environment jsdom */
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { UsedPreferences } from './index'



describe('used previous preferences', () => {

    beforeEach(() => {
        render (<UsedPreferences />, {wrapper: MemoryRouter})
    })

    test('it renders a form', () => {
        const form = screen.getByLabelText('form');
        expect(form).toBeInTheDocument();
    })
})
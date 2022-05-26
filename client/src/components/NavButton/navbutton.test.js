
/** @jest-environment jsdom */
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import {NavButton}from './index'

describe('NavButton', () => {
    test('it renders a nav button', () => {
        render(<NavButton path="/" value = ""/>, { wrapper: MemoryRouter });
        const btn = screen.getByRole('button');
        expect(btn).toBeInTheDocument();
    })
})
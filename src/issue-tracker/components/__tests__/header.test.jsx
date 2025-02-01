import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../header';

describe('Header Component', () => {
    const mockAddTodo = jest.fn();

    beforeEach(() => {
        render(<Header addTodo={mockAddTodo} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the header with input', () => {
        const input = screen.getByPlaceholderText('What needs to be done?');
        expect(input).toBeInTheDocument();
    });

    it('calls addTodo when enter is pressed with text', () => {
        const input = screen.getByPlaceholderText('What needs to be done?');
        userEvent.type(input, 'New Todo{enter}');
        
        expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
        expect(input.value).toBe('');
    });

    it('does not call addTodo when enter is pressed with empty text', () => {
        const input = screen.getByPlaceholderText('What needs to be done?');
        fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
        
        expect(mockAddTodo).not.toHaveBeenCalled();
    });

    it('does not call addTodo when enter is pressed with only whitespace', () => {
        const input = screen.getByPlaceholderText('What needs to be done?');
        userEvent.type(input, '   {enter}');
        
        expect(mockAddTodo).not.toHaveBeenCalled();
    });
});
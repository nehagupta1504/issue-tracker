import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Item from '../item';

describe('Item Component', () => {
    const mockTodo = {
        id: 1,
        text: 'Test Todo',
        completed: false
    };
    
    const mockProps = {
        todo: mockTodo,
        completeTodo: jest.fn(),
        deleteTodo: jest.fn(),
        editTodo: jest.fn()
    };

    beforeEach(() => {
        render(<Item {...mockProps} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders todo text', () => {
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    it('calls completeTodo when checkbox is clicked', () => {
        const checkbox = screen.getByRole('checkbox');
        userEvent.click(checkbox);
        expect(mockProps.completeTodo).toHaveBeenCalledWith(mockTodo.id);
    });

    it('calls deleteTodo when delete button is clicked', () => {
        const deleteButton = screen.getByRole('button', { name: /destroy/i });
        userEvent.click(deleteButton);
        expect(mockProps.deleteTodo).toHaveBeenCalledWith(mockTodo.id);
    });

    it('enters edit mode on double click', () => {
        const label = screen.getByText('Test Todo');
        fireEvent.doubleClick(label);
        
        const input = screen.getByDisplayValue('Test Todo');
        expect(input).toBeInTheDocument();
    });

    it('saves edits on blur', () => {
        const label = screen.getByText('Test Todo');
        fireEvent.doubleClick(label);
        
        const input = screen.getByDisplayValue('Test Todo');
        userEvent.type(input, ' Updated');
        fireEvent.blur(input);

        expect(mockProps.editTodo).toHaveBeenCalledWith(mockTodo.id, 'Test Todo Updated');
    });

    it('saves edits on enter', () => {
        const label = screen.getByText('Test Todo');
        fireEvent.doubleClick(label);
        
        const input = screen.getByDisplayValue('Test Todo');
        userEvent.type(input, ' Updated{enter}');

        expect(mockProps.editTodo).toHaveBeenCalledWith(mockTodo.id, 'Test Todo Updated');
    });

    it('cancels edit on escape', () => {
        const label = screen.getByText('Test Todo');
        fireEvent.doubleClick(label);
        
        const input = screen.getByDisplayValue('Test Todo');
        userEvent.type(input, ' Updated{escape}');

        expect(mockProps.editTodo).not.toHaveBeenCalled();
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });
});
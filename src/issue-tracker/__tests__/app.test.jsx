import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../app';

describe('App Component', () => {
    beforeEach(() => {
        render(<App />);
    });

    it('renders the app with header and footer', () => {
        expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
        expect(screen.getByText(/items left/i)).toBeInTheDocument();
    });

    it('can add a new todo', () => {
        const input = screen.getByPlaceholderText('What needs to be done?');
        userEvent.type(input, 'New Todo{enter}');
        
        expect(screen.getByText('New Todo')).toBeInTheDocument();
        expect(screen.getByText('1 item left')).toBeInTheDocument();
    });

    it('can toggle todo completion', () => {
        const input = screen.getByPlaceholderText('What needs to be done?');
        userEvent.type(input, 'Test Todo{enter}');
        
        const checkbox = screen.getByRole('checkbox');
        userEvent.click(checkbox);
        
        expect(screen.getByText('0 items left')).toBeInTheDocument();
    });

    it('can delete a todo', async () => {
        const input = screen.getByPlaceholderText('What needs to be done?');
        userEvent.type(input, 'Test Todo{enter}');
        
        // Trigger the destroy button to appear by hovering
        const todoItem = screen.getByText('Test Todo').closest('li');
        fireEvent.mouseEnter(todoItem);
        
        const deleteButton = screen.getByRole('button', { name: /destroy/i });
        userEvent.click(deleteButton);
        
        expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
    });

    it('can edit a todo', () => {
        const input = screen.getByPlaceholderText('What needs to be done?');
        userEvent.type(input, 'Test Todo{enter}');
        
        const todoLabel = screen.getByText('Test Todo');
        fireEvent.doubleClick(todoLabel);
        
        const editInput = screen.getByDisplayValue('Test Todo');
        userEvent.type(editInput, ' Updated{enter}');
        
        expect(screen.getByText('Test Todo Updated')).toBeInTheDocument();
    });

    it('can filter todos', async () => {
        // Add two todos
        const input = screen.getByPlaceholderText('What needs to be done?');
        userEvent.type(input, 'Todo 1{enter}');
        userEvent.type(input, 'Todo 2{enter}');
        
        // Complete first todo
        const firstCheckbox = screen.getAllByRole('checkbox')[0];
        userEvent.click(firstCheckbox);
        
        // Filter by active
        const activeFilter = screen.getByText(/active/i);
        userEvent.click(activeFilter);
        expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
        expect(screen.getByText('Todo 2')).toBeInTheDocument();
        
        // Filter by completed
        const completedFilter = screen.getByText(/completed/i);
        userEvent.click(completedFilter);
        expect(screen.getByText('Todo 1')).toBeInTheDocument();
        expect(screen.queryByText('Todo 2')).not.toBeInTheDocument();
        
        // Show all
        const allFilter = screen.getByText(/all/i);
        userEvent.click(allFilter);
        expect(screen.getByText('Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });

    it('can clear completed todos', () => {
        // Add and complete a todo
        const input = screen.getByPlaceholderText('What needs to be done?');
        userEvent.type(input, 'Test Todo{enter}');
        
        const checkbox = screen.getByRole('checkbox');
        userEvent.click(checkbox);
        
        // Clear completed
        const clearButton = screen.getByText('Clear completed');
        userEvent.click(clearButton);
        
        expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
    });
});
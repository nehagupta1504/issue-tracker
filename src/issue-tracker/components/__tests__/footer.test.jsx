import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../footer';

describe('Footer Component', () => {
    const mockProps = {
        completedCount: 1,
        activeCount: 2,
        onClearCompleted: jest.fn(),
        setVisibilityFilter: jest.fn()
    };

    beforeEach(() => {
        render(<Footer {...mockProps} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('displays the correct remaining items count', () => {
        expect(screen.getByText(/2 items left/i)).toBeInTheDocument();
    });

    it('renders filter buttons', () => {
        expect(screen.getByText(/all/i)).toBeInTheDocument();
        expect(screen.getByText(/active/i)).toBeInTheDocument();
        expect(screen.getByText(/completed/i)).toBeInTheDocument();
    });

    it('shows clear completed button when there are completed items', () => {
        const clearButton = screen.getByText('Clear completed');
        expect(clearButton).toBeInTheDocument();
        
        userEvent.click(clearButton);
        expect(mockProps.onClearCompleted).toHaveBeenCalled();
    });

    it('calls setVisibilityFilter when clicking filter buttons', () => {
        const activeFilter = screen.getByText(/active/i);
        userEvent.click(activeFilter);
        expect(mockProps.setVisibilityFilter).toHaveBeenCalledWith('SHOW_ACTIVE');

        const completedFilter = screen.getByText(/completed/i);
        userEvent.click(completedFilter);
        expect(mockProps.setVisibilityFilter).toHaveBeenCalledWith('SHOW_COMPLETED');

        const allFilter = screen.getByText(/all/i);
        userEvent.click(allFilter);
        expect(mockProps.setVisibilityFilter).toHaveBeenCalledWith('SHOW_ALL');
    });
});
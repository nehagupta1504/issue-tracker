import React, { memo, useCallback } from 'react';
import { SET_DUE_DATE } from '../constants';
import './due-date.css';

export const DueDate = memo(function DueDate({ todo, dispatch }) {
    const { id, dueDate } = todo;

    const handleDueDateChange = useCallback((e) => {
        const newDate = e.target.value ? new Date(e.target.value).toISOString() : null;
        dispatch({
            type: SET_DUE_DATE,
            payload: {
                id,
                dueDate: newDate
            }
        });
    }, [dispatch, id]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const isOverdue = () => {
        if (!dueDate || todo.completed) return false;
        return new Date(dueDate) < new Date();
    };

    const dueInDays = () => {
        if (!dueDate) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDay = new Date(dueDate);
        dueDay.setHours(0, 0, 0, 0);
        const diffTime = dueDay - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getDueDateText = () => {
        if (!dueDate) return null;
        const days = dueInDays();
        if (days === 0) return 'Due today';
        if (days < 0) return `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} overdue`;
        return `Due in ${days} day${days !== 1 ? 's' : ''}`;
    };

    return (
        <div className={`due-date-container ${isOverdue() ? 'overdue' : ''}`}>
            <input
                type="date"
                value={formatDateForInput(dueDate)}
                onChange={handleDueDateChange}
                className="due-date-input"
            />
            {dueDate && (
                <span className="due-date-text">
                    {getDueDateText()}
                    <button
                        className="clear-date-button"
                        onClick={() => handleDueDateChange({ target: { value: '' } })}
                        title="Clear due date"
                    >
                        ×
                    </button>
                </span>
            )}
        </div>
    );
});
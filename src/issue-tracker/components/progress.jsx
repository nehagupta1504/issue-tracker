import React, { memo, useCallback, useState } from 'react';
import { ADD_SUBTASK, REMOVE_SUBTASK, TOGGLE_SUBTASK, UPDATE_SUBTASK } from '../constants';
import './progress.css';

export const Progress = memo(function Progress({ todo, dispatch }) {
    const [newSubtask, setNewSubtask] = useState('');
    const [editingSubtask, setEditingSubtask] = useState(null);
    const { id, subtasks } = todo;

    const handleAddSubtask = useCallback((e) => {
        e.preventDefault();
        if (newSubtask.trim()) {
            dispatch({
                type: ADD_SUBTASK,
                payload: {
                    id,
                    title: newSubtask.trim()
                }
            });
            setNewSubtask('');
        }
    }, [dispatch, id, newSubtask]);

    const handleRemoveSubtask = useCallback((subtaskId) => {
        dispatch({
            type: REMOVE_SUBTASK,
            payload: {
                todoId: id,
                subtaskId
            }
        });
    }, [dispatch, id]);

    const handleToggleSubtask = useCallback((subtaskId) => {
        dispatch({
            type: TOGGLE_SUBTASK,
            payload: {
                todoId: id,
                subtaskId
            }
        });
    }, [dispatch, id]);

    const handleUpdateSubtask = useCallback((subtaskId, title) => {
        if (title.trim()) {
            dispatch({
                type: UPDATE_SUBTASK,
                payload: {
                    todoId: id,
                    subtaskId,
                    title: title.trim()
                }
            });
        } else {
            handleRemoveSubtask(subtaskId);
        }
        setEditingSubtask(null);
    }, [dispatch, id, handleRemoveSubtask]);

    const calculateProgress = () => {
        if (subtasks.length === 0) return 0;
        const completedCount = subtasks.filter(subtask => subtask.completed).length;
        return (completedCount / subtasks.length) * 100;
    };

    const progress = calculateProgress();

    return (
        <div className="progress-container">
            {subtasks.length > 0 && (
                <div className="progress-section">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                            title={`${Math.round(progress)}% complete`}
                        />
                    </div>
                    <span className="progress-text">{Math.round(progress)}%</span>
                </div>
            )}
            
            <div className="subtasks-list">
                {subtasks.map((subtask) => (
                    <div key={subtask.id} className="subtask-item">
                        <input
                            type="checkbox"
                            checked={subtask.completed}
                            onChange={() => handleToggleSubtask(subtask.id)}
                            className="subtask-checkbox"
                        />
                        {editingSubtask === subtask.id ? (
                            <input
                                type="text"
                                value={subtask.title}
                                onChange={(e) => {
                                    dispatch({
                                        type: UPDATE_SUBTASK,
                                        payload: {
                                            todoId: id,
                                            subtaskId: subtask.id,
                                            title: e.target.value
                                        }
                                    });
                                }}
                                onBlur={() => handleUpdateSubtask(subtask.id, subtask.title)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleUpdateSubtask(subtask.id, subtask.title);
                                    }
                                }}
                                className="subtask-edit-input"
                                autoFocus
                            />
                        ) : (
                            <span
                                className={`subtask-title ${subtask.completed ? 'completed' : ''}`}
                                onDoubleClick={() => setEditingSubtask(subtask.id)}
                            >
                                {subtask.title}
                            </span>
                        )}
                        <button
                            className="remove-subtask-button"
                            onClick={() => handleRemoveSubtask(subtask.id)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <form onSubmit={handleAddSubtask} className="add-subtask-form">
                <input
                    type="text"
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    placeholder="Add a subtask..."
                    className="add-subtask-input"
                />
                <button 
                    type="submit" 
                    className="add-subtask-button"
                    disabled={!newSubtask.trim()}
                >
                    Add
                </button>
            </form>
        </div>
    );
});
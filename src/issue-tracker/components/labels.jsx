import React, { memo, useCallback } from 'react';
import { ADD_LABEL, REMOVE_LABEL, DEFAULT_LABELS } from '../constants';
import './labels.css';

export const Labels = memo(function Labels({ todo, dispatch }) {
    const { id, labels } = todo;

    const handleAddLabel = useCallback((labelType) => {
        dispatch({
            type: ADD_LABEL,
            payload: {
                id,
                labelType,
                color: DEFAULT_LABELS[labelType].color
            }
        });
    }, [dispatch, id]);

    const handleRemoveLabel = useCallback((labelId) => {
        dispatch({
            type: REMOVE_LABEL,
            payload: {
                id,
                labelId
            }
        });
    }, [dispatch, id]);

    return (
        <div className="labels-container">
            <div className="current-labels">
                {labels.map((label) => (
                    <span
                        key={label.id}
                        className="label"
                        style={{ backgroundColor: label.color }}
                    >
                        {DEFAULT_LABELS[label.type].label}
                        <button
                            className="remove-label"
                            onClick={() => handleRemoveLabel(label.id)}
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
            <div className="label-selector">
                <select
                    onChange={(e) => handleAddLabel(e.target.value)}
                    value=""
                >
                    <option value="" disabled>Add Label</option>
                    {Object.entries(DEFAULT_LABELS).map(([key, { label, color }]) => (
                        <option
                            key={key}
                            value={key}
                            style={{ backgroundColor: color }}
                        >
                            {label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
});
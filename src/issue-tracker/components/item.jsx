import { memo, useState, useCallback } from "react";
import classnames from "classnames";

import { Input } from "./input";
import { EditModal } from "./edit-modal";
import { Comments } from "./comments";
import { Labels } from "./labels";
import { DueDate } from "./due-date";
import { Progress } from "./progress";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM, TOGGLE_EXPAND_ITEM, UPDATE_STATUS, STATUS_OPTIONS, ASSIGN_TASK, TEAM_MEMBERS, UPDATE_PRIORITY, PRIORITY_OPTIONS } from "../constants";

const truncateText = (text, wordCount = 10) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const Item = memo(function Item({ todo, dispatch, index }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { title, description, completed, expanded, id, status, taskId, createdAt, assignedTo, priority } = todo;

    const toggleItem = useCallback(() => dispatch({ type: TOGGLE_ITEM, payload: { id } }), [dispatch]);
    const toggleExpand = useCallback(() => dispatch({ type: TOGGLE_EXPAND_ITEM, payload: { id } }), [dispatch]);
    const removeItem = useCallback(() => dispatch({ type: REMOVE_ITEM, payload: { id } }), [dispatch]);
    const updateItem = useCallback((title, description) => dispatch({ type: UPDATE_ITEM, payload: { id, title, description } }), [dispatch]);
    const updateStatus = useCallback((newStatus) => dispatch({ type: UPDATE_STATUS, payload: { id, status: newStatus } }), [dispatch]);
    const updatePriority = useCallback((newPriority) => dispatch({ type: UPDATE_PRIORITY, payload: { id, priority: newPriority } }), [dispatch]);
    const assignTask = useCallback((assignee) => dispatch({ type: ASSIGN_TASK, payload: { id, assignedTo: assignee } }), [dispatch]);

    const handleEditClick = useCallback((e) => {
        e.stopPropagation();  // Prevent expanding when clicking edit
        setIsModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleModalSubmit = useCallback((newTitle, newDescription) => {
        if (newTitle.length === 0) {
            removeItem(id);
        } else {
            updateItem(newTitle, newDescription);
        }
    }, [id, removeItem, updateItem]);

    const isOverdue = () => {
        if (!todo.dueDate || todo.completed) return false;
        return new Date(todo.dueDate) < new Date();
    };

    return (
        <li className={classnames({ 
            completed: todo.completed, 
            expanded: todo.expanded,
            overdue: isOverdue()
        })} data-testid="todo-item">
            <div className="view">
                <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={completed} onChange={toggleItem} />
                <div className="content-container">
                    <label data-testid="todo-item-label" onClick={toggleExpand}>
                        <div className="issue-header">
                            <span className="task-id">#{taskId}</span>
                            <span className="priority-indicator" style={{ backgroundColor: PRIORITY_OPTIONS[priority].color }}>
                                {PRIORITY_OPTIONS[priority].label}
                            </span>
                            <span className="title">{title}</span>
                            <button 
                                className="edit-button"
                                onClick={handleEditClick}
                                data-testid="todo-item-edit"
                                title="Edit Issue"
                            >
                                ✎
                            </button>
                        </div>
                        <div className="creation-date">
                            Created: {formatDate(createdAt)}
                        </div>
                        {description && !expanded && (
                            <div className="truncated-description">
                                {truncateText(description)}
                            </div>
                        )}
                    </label>
                    {expanded && description && (
                        <div className="description">
                            {description}
                        </div>
                    )}
                    <Labels todo={todo} dispatch={dispatch} />
                    <DueDate todo={todo} dispatch={dispatch} />
                    {expanded && <Progress todo={todo} dispatch={dispatch} />}
                    <div className="selects-container">
                        <select 
                            className="priority-select"
                            value={priority}
                            onChange={(e) => updatePriority(e.target.value)}
                            data-testid="todo-item-priority"
                            style={{ 
                                color: PRIORITY_OPTIONS[priority].color,
                                borderColor: PRIORITY_OPTIONS[priority].color
                            }}
                        >
                            {Object.entries(PRIORITY_OPTIONS).map(([key, {label, color}]) => (
                                <option key={key} value={key} style={{ color }}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <select 
                            className="status-select"
                            value={status}
                            onChange={(e) => updateStatus(e.target.value)}
                            data-testid="todo-item-status"
                        >
                            {STATUS_OPTIONS.map(option => (
                                <option key={option} value={option} className={`status-${option.toLowerCase().replace(' ', '-')}`}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <select
                            className="assignee-select"
                            value={assignedTo}
                            onChange={(e) => assignTask(e.target.value)}
                            data-testid="todo-item-assignee"
                        >
                            {TEAM_MEMBERS.map(member => (
                                <option key={member} value={member}>
                                    {member}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className="destroy" data-testid="todo-item-button" onClick={removeItem} />
            </div>

            <EditModal 
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                todo={todo}
            />

            <Comments todo={todo} dispatch={dispatch} />
        </li>
    );
});

import React from 'react';
import './edit-modal.css';

export function EditModal({ isOpen, onClose, todo, onSubmit }) {
    const [title, setTitle] = React.useState(todo?.title || '');
    const [description, setDescription] = React.useState(todo?.description || '');

    React.useEffect(() => {
        if (isOpen && todo) {
            setTitle(todo.title);
            setDescription(todo.description);
        }
    }, [isOpen, todo]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(title, description);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" data-testid="edit-modal">
                <div className="modal-header">
                    <h3>Edit Issue #{todo.taskId}</h3>
                    <button className="modal-close-button" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title"
                                required
                                className="modal-input"
                                data-testid="modal-title-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description"
                                className="modal-textarea"
                                rows="4"
                                data-testid="modal-description-input"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="modal-button secondary">
                            Cancel
                        </button>
                        <button type="submit" className="modal-button primary" data-testid="modal-save-button">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import { useCallback } from "react";

const sanitize = (string) => {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
};

const hasValidMin = (value, min) => {
    return value.length >= min;
};

export function Input({ onSubmit, placeholder, label, defaultValue, onBlur }) {
    const handleBlur = useCallback(() => {
        if (onBlur)
            onBlur();
    }, [onBlur]);

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter") {
                const value = e.target.value.trim();

                if (!hasValidMin(value, 2))
                    return;

                onSubmit(sanitize(value));
                e.target.value = "";
            }
        },
        [onSubmit]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.elements['todo-input-title'].value.trim();
        const description = form.elements['todo-input-description'].value.trim();

        if (!hasValidMin(title, 2)) return;

        onSubmit(sanitize(title), sanitize(description));
        form.reset();
        form.elements['todo-input-title'].focus();
    };

    return (
        <form className="input-container input-vertical" onSubmit={handleSubmit}>
            <div className="input-fields">
                <input 
                    className="new-todo title-input" 
                    name="todo-input-title"
                    id="todo-input-title" 
                    type="text" 
                    data-testid="text-input-title" 
                    autoFocus 
                    placeholder={placeholder} 
                    defaultValue={defaultValue} 
                    onBlur={handleBlur}
                />
                <label className="visually-hidden" htmlFor="todo-input-title">
                    {label} Title
                </label>
                <input 
                    className="new-todo description-input" 
                    name="todo-input-description"
                    id="todo-input-description" 
                    type="text" 
                    data-testid="text-input-description" 
                    placeholder="Add a description (optional)" 
                />
                <label className="visually-hidden" htmlFor="todo-input-description">
                    {label} Description
                </label>
                <div className="button-container">
                    <button type="submit" className="add-button" data-testid="add-button">
                        Add Task
                    </button>
                </div>
            </div>
        </form>
    );
}

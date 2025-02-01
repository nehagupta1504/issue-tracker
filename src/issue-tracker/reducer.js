import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM, TOGGLE_ITEM, REMOVE_ALL_ITEMS, TOGGLE_ALL, REMOVE_COMPLETED_ITEMS, TOGGLE_EXPAND_ITEM, UPDATE_STATUS, ASSIGN_TASK, ADD_COMMENT, TOGGLE_COMMENTS, UPDATE_PRIORITY, ADD_LABEL, REMOVE_LABEL, SET_DUE_DATE, ADD_SUBTASK, REMOVE_SUBTASK, TOGGLE_SUBTASK, UPDATE_SUBTASK, PRIORITY_OPTIONS } from "./constants";

/* Borrowed from https://github.com/ai/nanoid/blob/3.0.2/non-secure/index.js

The MIT License (MIT)

Copyright 2017 Andrey Sitnik <andrey@sitnik.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

// This alphabet uses `A-Za-z0-9_-` symbols.
// The order of characters is optimized for better gzip and brotli compression.
// References to the same file (works both for gzip and brotli):
// `'use`, `andom`, and `rict'`
// References to the brotli default dictionary:
// `-26T`, `1983`, `40px`, `75px`, `bush`, `jack`, `mind`, `very`, and `wolf`
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

function nanoid(size = 21) {
    let id = "";
    // A compact alternative for `for (var i = 0; i < step; i++)`.
    let i = size;
    while (i--) {
        // `| 0` is more compact and faster than `Math.floor()`.
        id += urlAlphabet[(Math.random() * 64) | 0];
    }
    return id;
}

// Keep track of the next taskId
let nextTaskId = 1;

export const todoReducer = (state, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return state.concat({ 
                id: nanoid(),
                taskId: nextTaskId++, 
                title: action.payload.title, 
                description: action.payload.description || '',
                completed: false,
                expanded: false,
                status: "Open",
                assignedTo: "Unassigned",
                createdAt: new Date().toISOString(),
                comments: [],
                showComments: false,
                priority: "LOW",
                labels: [],
                dueDate: null,
                subtasks: []
            });
        case UPDATE_ITEM:
            return state.map((todo) => (todo.id === action.payload.id ? { ...todo, title: action.payload.title, description: action.payload.description } : todo));
        case REMOVE_ITEM:
            return state.filter((todo) => todo.id !== action.payload.id);
        case TOGGLE_ITEM:
            return state.map((todo) => (todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo));
        case REMOVE_ALL_ITEMS:
            return [];
        case TOGGLE_ALL:
            return state.map((todo) => (todo.completed !== action.payload.completed ? { ...todo, completed: action.payload.completed } : todo));
        case REMOVE_COMPLETED_ITEMS:
            return state.filter((todo) => !todo.completed);
        case TOGGLE_EXPAND_ITEM:
            return state.map((todo) => (todo.id === action.payload.id ? { ...todo, expanded: !todo.expanded } : todo));
        case UPDATE_STATUS:
            return state.map((todo) => (todo.id === action.payload.id ? { ...todo, status: action.payload.status } : todo));
        case ASSIGN_TASK:
            return state.map((todo) => (todo.id === action.payload.id ? { ...todo, assignedTo: action.payload.assignedTo } : todo));
        case ADD_COMMENT:
            return state.map((todo) => 
                todo.id === action.payload.id 
                    ? { 
                        ...todo, 
                        comments: [...todo.comments, {
                            id: nanoid(),
                            text: action.payload.text,
                            author: action.payload.author,
                            createdAt: new Date().toISOString()
                        }]
                    } 
                    : todo
            );
        case TOGGLE_COMMENTS:
            return state.map((todo) => 
                todo.id === action.payload.id 
                    ? { ...todo, showComments: !todo.showComments }
                    : todo
            );
        case UPDATE_PRIORITY:
            return state.map((todo) =>
                todo.id === action.payload.id
                    ? { ...todo, priority: action.payload.priority }
                    : todo
            );
        case ADD_LABEL:
            return state.map((todo) =>
                todo.id === action.payload.id
                    ? {
                        ...todo,
                        labels: [
                            ...todo.labels,
                            {
                                id: nanoid(),
                                type: action.payload.labelType,
                                color: action.payload.color
                            }
                        ]
                    }
                    : todo
            );
        case REMOVE_LABEL:
            return state.map((todo) =>
                todo.id === action.payload.id
                    ? {
                        ...todo,
                        labels: todo.labels.filter(
                            (label) => label.id !== action.payload.labelId
                        )
                    }
                    : todo
            );
        case SET_DUE_DATE:
            return state.map((todo) =>
                todo.id === action.payload.id
                    ? {
                        ...todo,
                        dueDate: action.payload.dueDate
                    }
                    : todo
            );
        case ADD_SUBTASK:
            return state.map((todo) =>
                todo.id === action.payload.id
                    ? {
                        ...todo,
                        subtasks: [
                            ...todo.subtasks,
                            {
                                id: nanoid(),
                                title: action.payload.title,
                                completed: false
                            }
                        ]
                    }
                    : todo
            );
        case REMOVE_SUBTASK:
            return state.map((todo) =>
                todo.id === action.payload.todoId
                    ? {
                        ...todo,
                        subtasks: todo.subtasks.filter(
                            (subtask) => subtask.id !== action.payload.subtaskId
                        )
                    }
                    : todo
            );
        case TOGGLE_SUBTASK:
            return state.map((todo) =>
                todo.id === action.payload.todoId
                    ? {
                        ...todo,
                        subtasks: todo.subtasks.map((subtask) =>
                            subtask.id === action.payload.subtaskId
                                ? { ...subtask, completed: !subtask.completed }
                                : subtask
                        )
                    }
                    : todo
            );
        case UPDATE_SUBTASK:
            return state.map((todo) =>
                todo.id === action.payload.todoId
                    ? {
                        ...todo,
                        subtasks: todo.subtasks.map((subtask) =>
                            subtask.id === action.payload.subtaskId
                                ? { ...subtask, title: action.payload.title }
                                : subtask
                        )
                    }
                    : todo
            );
    }

    throw Error(`Unknown action: ${action.type}`);
};

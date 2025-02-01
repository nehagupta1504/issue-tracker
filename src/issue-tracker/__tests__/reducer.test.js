import reducer from '../reducer';
import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO,
    COMPLETE_ALL_TODOS,
    CLEAR_COMPLETED,
    SET_VISIBILITY_FILTER,
} from '../constants';

describe('todo reducer', () => {
    const initialState = {
        todos: [],
        visibilityFilter: 'SHOW_ALL'
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle ADD_TODO', () => {
        const action = {
            type: ADD_TODO,
            text: 'Run tests',
        };
        const expectedState = {
            todos: [
                {
                    text: 'Run tests',
                    completed: false,
                    id: expect.any(Number),
                },
            ],
            visibilityFilter: 'SHOW_ALL',
        };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DELETE_TODO', () => {
        const startState = {
            todos: [
                { id: 1, text: 'Test 1', completed: false },
                { id: 2, text: 'Test 2', completed: false },
            ],
            visibilityFilter: 'SHOW_ALL',
        };
        const action = {
            type: DELETE_TODO,
            id: 1,
        };
        const expectedState = {
            todos: [
                { id: 2, text: 'Test 2', completed: false },
            ],
            visibilityFilter: 'SHOW_ALL',
        };
        expect(reducer(startState, action)).toEqual(expectedState);
    });

    it('should handle EDIT_TODO', () => {
        const startState = {
            todos: [
                { id: 1, text: 'Test 1', completed: false },
            ],
            visibilityFilter: 'SHOW_ALL',
        };
        const action = {
            type: EDIT_TODO,
            id: 1,
            text: 'Test 1 Updated',
        };
        const expectedState = {
            todos: [
                { id: 1, text: 'Test 1 Updated', completed: false },
            ],
            visibilityFilter: 'SHOW_ALL',
        };
        expect(reducer(startState, action)).toEqual(expectedState);
    });

    it('should handle COMPLETE_TODO', () => {
        const startState = {
            todos: [
                { id: 1, text: 'Test 1', completed: false },
            ],
            visibilityFilter: 'SHOW_ALL',
        };
        const action = {
            type: COMPLETE_TODO,
            id: 1,
        };
        const expectedState = {
            todos: [
                { id: 1, text: 'Test 1', completed: true },
            ],
            visibilityFilter: 'SHOW_ALL',
        };
        expect(reducer(startState, action)).toEqual(expectedState);
    });

    it('should handle COMPLETE_ALL_TODOS', () => {
        const startState = {
            todos: [
                { id: 1, text: 'Test 1', completed: false },
                { id: 2, text: 'Test 2', completed: true },
            ],
            visibilityFilter: 'SHOW_ALL',
        };
        const action = {
            type: COMPLETE_ALL_TODOS,
        };
        const expectedState = {
            todos: [
                { id: 1, text: 'Test 1', completed: true },
                { id: 2, text: 'Test 2', completed: true },
            ],
            visibilityFilter: 'SHOW_ALL',
        };
        expect(reducer(startState, action)).toEqual(expectedState);
    });

    it('should handle CLEAR_COMPLETED', () => {
        const startState = {
            todos: [
                { id: 1, text: 'Test 1', completed: false },
                { id: 2, text: 'Test 2', completed: true },
            ],
            visibilityFilter: 'SHOW_ALL',
        };
        const action = {
            type: CLEAR_COMPLETED,
        };
        const expectedState = {
            todos: [
                { id: 1, text: 'Test 1', completed: false },
            ],
            visibilityFilter: 'SHOW_ALL',
        };
        expect(reducer(startState, action)).toEqual(expectedState);
    });

    it('should handle SET_VISIBILITY_FILTER', () => {
        const action = {
            type: SET_VISIBILITY_FILTER,
            filter: 'SHOW_COMPLETED',
        };
        const expectedState = {
            todos: [],
            visibilityFilter: 'SHOW_COMPLETED',
        };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });
});
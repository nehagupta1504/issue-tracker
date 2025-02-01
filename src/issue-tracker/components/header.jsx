import { useCallback } from "react";
import { Input } from "./input";

import { ADD_ITEM } from "../constants";

export function Header({ dispatch }) {
    const addItem = useCallback((title, description) => dispatch({ type: ADD_ITEM, payload: { title, description } }), [dispatch]);

    return (
        <header className="header" data-testid="header">
            <h1>Issues</h1>
            <Input onSubmit={addItem} label="New Issue Input" placeholder="Describe the issue to be tracked" />
        </header>
    );
}

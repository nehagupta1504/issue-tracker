import { useMemo, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./item";
import { FilterBar } from "./filter-bar";
import { SearchBar } from "./search-bar";
import classnames from "classnames";

import { TOGGLE_ALL, PRIORITY_LEVELS } from "../constants";

export function Main({ todos, dispatch }) {
    const { pathname: route } = useLocation();
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("NONE");
    const [searchQuery, setSearchQuery] = useState("");

    const visibleTodos = useMemo(
        () => {
            // First filter the todos
            const filteredTodos = todos.filter((todo) => {
                // First apply the route filtering
                if (route === "/active" && todo.completed) return false;
                if (route === "/completed" && !todo.completed) return false;

                // Then apply status filtering
                if (statusFilter !== "all" && todo.status !== statusFilter) return false;

                // Then apply priority filtering
                if (priorityFilter !== "all" && todo.priority !== priorityFilter) return false;

                // Finally apply search filtering
                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    const titleMatch = todo.title.toLowerCase().includes(query);
                    const descriptionMatch = todo.description?.toLowerCase().includes(query);
                    if (!titleMatch && !descriptionMatch) return false;
                }

                return true;
            });

            // Then sort the filtered todos if a sort order is selected
            if (sortOrder !== "NONE") {
                const sortedTodos = [...filteredTodos].sort((a, b) => {
                    const priorityA = PRIORITY_LEVELS[a.priority] || 0;
                    const priorityB = PRIORITY_LEVELS[b.priority] || 0;
                    return sortOrder === "HIGH_TO_LOW" ? priorityB - priorityA : priorityA - priorityB;
                });
                return sortedTodos;
            }

            return filteredTodos;
        },
        [todos, route, statusFilter, priorityFilter, sortOrder, searchQuery]
    );

    const toggleAll = useCallback((e) => dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked } }), [dispatch]);

    return (
        <main className="main" data-testid="main">
            <div className="filters-and-search">
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
                <FilterBar
                    statusFilter={statusFilter}
                    priorityFilter={priorityFilter}
                    sortOrder={sortOrder}
                    onStatusFilterChange={setStatusFilter}
                    onPriorityFilterChange={setPriorityFilter}
                    onSortOrderChange={setSortOrder}
                />
            </div>
            {visibleTodos.length > 0 ? (
                <div className="toggle-all-container">
                    <input className="toggle-all" type="checkbox" id="toggle-all" data-testid="toggle-all" checked={visibleTodos.every((todo) => todo.completed)} onChange={toggleAll} />
                    <label className="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
            ) : null}
            <ul className={classnames("todo-list")} data-testid="todo-list">
                {visibleTodos.map((todo, index) => (
                    <Item todo={todo} key={todo.id} dispatch={dispatch} index={index} />
                ))}
            </ul>
        </main>
    );
}

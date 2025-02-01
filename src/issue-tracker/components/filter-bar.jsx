import { memo } from "react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS, SORT_OPTIONS } from "../constants";
import "./filter-bar.css";

export const FilterBar = memo(({ 
    statusFilter, 
    priorityFilter, 
    sortOrder,
    onStatusFilterChange, 
    onPriorityFilterChange,
    onSortOrderChange 
}) => {
    return (
        <div className="filter-bar" data-testid="filter-bar">
            <div className="filter-group">
                <div className="filter-item">
                    <label htmlFor="status-filter">Status: </label>
                    <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={(e) => onStatusFilterChange(e.target.value)}
                    >
                        <option value="all">All</option>
                        {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                
                <div className="filter-item">
                    <label htmlFor="priority-filter">Priority: </label>
                    <select
                        id="priority-filter"
                        value={priorityFilter}
                        onChange={(e) => onPriorityFilterChange(e.target.value)}
                    >
                        <option value="all">All</option>
                        {Object.entries(PRIORITY_OPTIONS).map(([key, value]) => (
                            <option key={key} value={key}>{value.label}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-item">
                    <label htmlFor="sort-order">Sort by Priority: </label>
                    <select
                        id="sort-order"
                        value={sortOrder}
                        onChange={(e) => onSortOrderChange(e.target.value)}
                    >
                        {Object.entries(SORT_OPTIONS).map(([key, value]) => (
                            <option key={key} value={key}>{value.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
});
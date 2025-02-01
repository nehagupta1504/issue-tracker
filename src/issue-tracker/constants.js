export const ADD_ITEM = "ADD_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const TOGGLE_ITEM = "TOGGLE_ITEM";
export const REMOVE_ALL_ITEMS = "REMOVE_ALL_ITEMS";
export const TOGGLE_ALL = "TOGGLE_ALL";
export const REMOVE_COMPLETED_ITEMS = "REMOVE_COMPLETED_ITEMS";
export const TOGGLE_EXPAND_ITEM = "TOGGLE_EXPAND_ITEM";
export const UPDATE_STATUS = "UPDATE_STATUS";
export const ASSIGN_TASK = "ASSIGN_TASK";
export const ADD_COMMENT = "ADD_COMMENT";
export const TOGGLE_COMMENTS = "TOGGLE_COMMENTS";
export const UPDATE_PRIORITY = "UPDATE_PRIORITY";
export const ADD_LABEL = "ADD_LABEL";
export const REMOVE_LABEL = "REMOVE_LABEL";
export const SET_DUE_DATE = "SET_DUE_DATE";
export const ADD_SUBTASK = "ADD_SUBTASK";
export const REMOVE_SUBTASK = "REMOVE_SUBTASK";
export const TOGGLE_SUBTASK = "TOGGLE_SUBTASK";
export const UPDATE_SUBTASK = "UPDATE_SUBTASK";

export const STATUS_OPTIONS = ["Open", "In Progress", "Closed"];

export const PRIORITY_OPTIONS = {
    LOW: { label: "Low", color: "#4CAF50" },     // Green
    MEDIUM: { label: "Medium", color: "#FF9800" }, // Orange/Yellow
    HIGH: { label: "High", color: "#F44336" }     // Red
};

export const DEFAULT_LABELS = {
    BUG: { label: "Bug", color: "#DC3545" },       // Red
    FEATURE: { label: "Feature", color: "#28A745" }, // Green
    ENHANCEMENT: { label: "Enhancement", color: "#17A2B8" } // Blue
};

export const TEAM_MEMBERS = [
  "Unassigned",
  "John Doe",
  "Jane Smith",
  "Mike Johnson",
  "Sarah Wilson",
  "David Brown"
];

export const SORT_OPTIONS = {
    NONE: { label: "None", value: null },
    HIGH_TO_LOW: { label: "High to Low", value: "desc" },
    LOW_TO_HIGH: { label: "Low to High", value: "asc" }
};

// Priority levels for sorting
export const PRIORITY_LEVELS = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1
};

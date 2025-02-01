import { useReducer } from "react";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";
import ThemeToggle from "./components/theme-toggle";

import { todoReducer } from "./reducer";

import "./app.css";
import "./components/item.css";

export function App() {
    const [todos, dispatch] = useReducer(todoReducer, []);

    return (
        <>
            <ThemeToggle />
            <Header dispatch={dispatch} />
            <Main todos={todos} dispatch={dispatch} />
            <Footer todos={todos} dispatch={dispatch} />
        </>
    );
}

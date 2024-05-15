import { createContext, useReducer } from "react";

export const Store = createContext();

const category = Store.value

export function StroreProvider(props) {
    const [state, dispatch] = useReducer(category);
    const value = {state, dispatch};
    return <StroreProvider value={value}>{props.children}</StroreProvider>
}
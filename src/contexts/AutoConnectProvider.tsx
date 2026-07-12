import { createContext, FC, ReactNode, useContext } from 'react';

export interface AutoConnectContextState {
    autoConnect: boolean;
}

export const AutoConnectContext = createContext<AutoConnectContextState>({} as AutoConnectContextState);

export function useAutoConnect(): AutoConnectContextState {
    return useContext(AutoConnectContext);
}

export const AutoConnectProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AutoConnectContext.Provider value={{ autoConnect: true }}>{children}</AutoConnectContext.Provider>
    );
};

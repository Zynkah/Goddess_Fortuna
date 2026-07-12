import { createContext, FC, ReactNode, useContext } from 'react';

export interface NetworkConfigurationState {
    networkConfiguration: string;
}

export const NetworkConfigurationContext = createContext<NetworkConfigurationState>({} as NetworkConfigurationState);

export function useNetworkConfiguration(): NetworkConfigurationState {
    return useContext(NetworkConfigurationContext);
}

export const NetworkConfigurationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <NetworkConfigurationContext.Provider value={{ networkConfiguration: 'mainnet-beta' }}>{children}</NetworkConfigurationContext.Provider>
    );
};

import { NavigationContainerRef } from '@react-navigation/native';
import React, { createContext, useContext, ReactNode, useRef } from 'react';
import { RootStackParamList } from '../components';

export interface NavigationContextType {
	navigate: (name: string, params?: any) => void,
	navigationRef: React.RefObject<NavigationContainerRef<RootStackParamList>>,
}


const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigationContext = () => {
	const context = useContext(NavigationContext);
	if (!context) {
		throw new Error('useNavigationContext must be used within a NavigationProvider');
	}
	return context;
};

interface NavigationProviderProps {
	children: ReactNode,
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
	const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

	const navigate = (name: any, params?: any) => {
		navigationRef.current?.navigate(name, params);
	};

	return (
		<NavigationContext.Provider value={{ navigate, navigationRef }}>
			{children}
		</NavigationContext.Provider>
	);
};

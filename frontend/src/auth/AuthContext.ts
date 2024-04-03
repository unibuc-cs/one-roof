import { createContext } from 'react';

interface IAuthContext {
    user: { name: string } | null,
    signIn: () => Promise<void>,
    signOut: () => void,
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

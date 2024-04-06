import { createContext } from 'react';

interface IAuthContext {
    accessToken: string | null,
    user: { name: string } | null,
    signIn: () => Promise<void>,
    signOut: () => void,
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

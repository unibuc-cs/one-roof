import * as AuthSession from 'expo-auth-session';
import React, { useContext, useState, useEffect, createContext, type ReactNode } from 'react';
import { Alert, Platform } from 'react-native';
import { AuthContext } from './AuthContext';
import { type AuthRequestConfig, type AuthRequestPromptOptions, type AuthSessionRedirectUriOptions } from 'expo-auth-session';
import { config } from '../configure';
import 'core-js/stable/atob';
import { jwtDecode } from 'jwt-decode';

interface IAuthContext {
    user: { name: string } | null,
    signIn: () => Promise<void>,
    signOut: () => void,
}

const auth0ClientId = config.auth0.clientId;
const authorizationEndpoint = `https://${config.auth0.domain}/authorize`;

const useProxy: boolean = Platform.select({ web: false, default: true });
const redirectUri: string = AuthSession.makeRedirectUri({ useProxy } as AuthSessionRedirectUriOptions);

console.log('redirectUri:', redirectUri);

interface AuthProviderProps {
    children: ReactNode,
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: { children: ReactNode }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
    const [user, setUser] = useState<{ name: string } | null>(null);

    const [request, result, promptAsync] = AuthSession.useAuthRequest({
        redirectUri,
        clientId: auth0ClientId,
        responseType: 'id_token',
        scopes: ['openid', 'profile'],
        extraParams: { nonce: 'nonce' }
    } as AuthRequestConfig, { authorizationEndpoint });

    useEffect(() => {
        try {
            if (result?.type === 'success') {
                const jwtToken = result.params.id_token;
                const decoded: { name: string } = jwtDecode(jwtToken);
                setUser({ name: decoded.name });
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }, [result]);

    const signIn = async () => {
        await promptAsync({ useProxy } as AuthRequestPromptOptions);
    };

    const signOut = () => {
        setUser(null);
    };

    return { user, signIn, signOut };
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

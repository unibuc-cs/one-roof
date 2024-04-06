import * as AuthSession from 'expo-auth-session';
import React, { useContext, useState, useEffect, createContext, type ReactNode } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { AuthContext } from './AuthContext';
import { type AuthRequestConfig, type AuthRequestPromptOptions, type AuthSessionRedirectUriOptions } from 'expo-auth-session';
import { config } from '../configure';
import 'core-js/stable/atob';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth0ClientId = config.auth0.clientId;
const useProxy: boolean = Platform.select({ web: false, default: true });
const authorizationEndpoint = `https://${config.auth0.domain}/authorize`;
const redirectUri: string = AuthSession.makeRedirectUri({ useProxy } as AuthSessionRedirectUriOptions);
const logoutRedirectUri: string = AuthSession.makeRedirectUri({ useProxy: false } as AuthSessionRedirectUriOptions);
const logoutUrl = `https://${config.auth0.domain}/v2/logout?client_id=${config.auth0.clientId}&returnTo=${encodeURIComponent(logoutRedirectUri)}`;

console.log('redirectUri:', redirectUri);
console.log('logoutRedirectUri:', logoutRedirectUri);

interface AuthProviderProps {
    children: ReactNode,
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: { children: ReactNode }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
    const [user, setUser] = useState<{ name: string } | null>(null);

    const [accessToken, setAccessToken] = useState<string | null>(null);
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
                AsyncStorage.setItem('accessToken', jwtToken).then(r => { console.log('accessToken saved:', r); });
                setAccessToken(jwtToken);
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

    const signOut = async () => {
        setUser(null);
        await Linking.openURL(logoutUrl);
    };

    return { accessToken, user, signIn, signOut };
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

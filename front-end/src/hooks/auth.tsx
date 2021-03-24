import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
    token: string;
    user: object;
}

interface ISignIn {
    username: string;
    password: string;
}

interface AuthContextState {
    user: object;
    signIn(credentials: ISignIn): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@Opnet:Token');
        const user = localStorage.getItem('@Opnet:User');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback( async ({ username, password }) => {
        const response = await api.post('session', {
            username, password 
        });

        const { token, user } = response.data;

        localStorage.setItem('@Opnet:Token', token);
        localStorage.setItem('@Opnet:User', JSON.stringify(user));

        setData({ token, user});
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@Opnet:Token');
        localStorage.removeItem('@Opnet:User');

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }} >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextState {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth }
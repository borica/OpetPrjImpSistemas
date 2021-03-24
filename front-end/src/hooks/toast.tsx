import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4'

import ToastContainer from '../components/ToastContainer';

export interface ToasMessage {
    id: string;
    type?: 'success' | 'error' | 'info';
    title: string;
    description?: string;
}

interface ContextToastData {
    addToast(message: Omit<ToasMessage, 'id'>): void;
    removeToast(id: string): void;
}

const ToastContext = createContext<ContextToastData>({} as ContextToastData);

const ToastProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<ToasMessage[]>([]);

    const addToast = useCallback(({ type, title, description }: Omit<ToasMessage, 'id'>) => {
        const id = uuid();

        const toast = { id, type, title, description };

        setMessages(oldMessages => [...oldMessages, toast]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setMessages(oldMessages => oldMessages.filter(message => message.id !== id));
    }, []);


    return (
       <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} />          
       </ToastContext.Provider>
    )
}

function useToast(): ContextToastData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used eithin a ToastProvider');
    }

    return context;
}

export { useToast, ToastProvider }
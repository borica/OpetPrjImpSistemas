import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';

import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

import IconButtons from '../../assets/arrow-bt-filtros.svg';

import {  useHistory } from 'react-router-dom';

import { Container, Content, AreaUsers, HeaderUser, CardUser, BottonsCardUser } from './styles';
import { useToast } from '../../hooks/toast';

interface AllUsers {
    id: number;
    name: string;
    username: string;
    email: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<AllUsers[]>([]);

    const history = useHistory();
    const { addToast } = useToast();

    const callUsers = useCallback(async () =>
    {
        try {
            const session = localStorage.getItem('@Opnet:Token');

            api.defaults.headers.authorization = `Bearer ${session}`;
            const response = await api.get('/users');

            const data = response.data;
            setUsers(data.users)
        } catch (error) {
            history.push('/');

            addToast({
                type: 'error',
                title:'Erro de usuário',
                description: 'Ocorreu um erro ao fazer a listagem de todos os usuário.',
              });

        }
    }, [history, addToast]);

    useEffect(() =>
    {
        callUsers();
    }, [callUsers]);

    const handleDeleteUser = useCallback(async (id: number) => {
        try {
            const session = localStorage.getItem('@Opnet:Token');
            api.defaults.headers.authorization = `Bearer ${session}`;
            await api.delete(`/users/${id}`);
            callUsers();
            addToast({
                type: 'success',
                title:'Usuário deletado'
              });
              
        } catch (error) {

            addToast({
                type: 'error',
                title:'Erro ao deletar usuário'
              });

        }
    }, [addToast, callUsers]);

    const handleAcceptUser = useCallback(async (id: number) => {
        try {
            const data = { user_id: id, approved: true }
            const session = localStorage.getItem('@Opnet:Token');
            api.defaults.headers.authorization = `Bearer ${session}`;
            await api.patch('/users/approved', data);
            callUsers();
            addToast({
                type: 'success',
                title:'Usuário ja pode fazer login.'
            });
            
        } catch (error) {

            addToast({
                type: 'error',
                title:'Erro ao aceitar acesso do usuário'
              });

        }
    }, [addToast, callUsers]);

    return (
        <>
        <Header />
        <Container>
            <SideBar />
            <Content>
                <AreaUsers>
                        <HeaderUser>
                            <div>ID</div>
                            <div>NAME</div>
                            <div>EMAIL</div>
                            <div>USERNAME</div>
                            <div>AÇÕES</div>
                        </HeaderUser>
                         {users.map((row) =>
                            <CardUser key={row.id}>
                                <h1>{row.id}</h1>
                                <div>{row.name}</div>
                                <div>{row.email}</div>
                                <div>{row.username}</div>
                                <BottonsCardUser>
                                    <button onClick={() => { handleAcceptUser(row.id) }}>
                                        <h1>ACEITAR</h1>
                                        <img src={IconButtons} alt="filtros" />
                                    </button>
                                    <button onClick={() => { handleDeleteUser(row.id) }}>
                                        <h1>DELETAR</h1>
                                        <img src={IconButtons} alt="filtros" />
                                    </button>
                                </BottonsCardUser>
                            </CardUser>
                        )}
                </AreaUsers>
            </Content>
        </Container>
        </>
    );
};

export default Users;
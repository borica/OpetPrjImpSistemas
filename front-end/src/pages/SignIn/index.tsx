import React from 'react';
import { FiLogIn, FiUser, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
    <Container>
        <Content>
            <form>
                <h1>Faca seu Login</h1>

                <Input name="username" icon={FiUser} placeholder='Username' />
                <Input name="password" icon={FiLock} type='password' placeholder='Senha' />

                <Button type='submit'>Entrar</Button>
            </form>

            <a href="teste">
                <FiLogIn />
                Criar conta
            </a>
        </Content>
        <Background />
    </Container>
);

export default SignIn;
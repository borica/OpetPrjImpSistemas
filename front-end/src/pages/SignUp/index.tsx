import React, { useCallback } from 'react';
import { FiArrowLeft, FiUser, FiLock, FiMail, FiUserPlus } from 'react-icons/fi';
import * as Yup from 'yup';

import { Form } from '@unform/web'

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
    const hundleSubmit = useCallback( async (data: object) => {
        try{
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome é obrigatório.'),
                email: Yup.string().required('E-mail é obrigatório.').email('Digite um e-mail valido.'),
                username: Yup.string().required('Username é obrigatório.'),
                password: Yup.string().required('Senha é obrigatória.').min(6, 'Senha no mínimo 6 digitos.'),
            });

            await schema.validate(data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <Container>
            <Background />
            <Content>
                <Form onSubmit={hundleSubmit}>
                    <h1>Faca seu cadastro</h1>

                    <Input name="name"  icon={FiUser} placeholder='Nome' />
                    <Input name="email" icon={FiMail} placeholder='E-mail' />
                    <Input name="username" icon={FiUserPlus} placeholder='Username' />
                    <Input name="password" icon={FiLock} type='password' placeholder='Senha' />

                    <Button type='submit'>Cadastrar</Button>
                </Form>

                <a href="teste">
                    <FiArrowLeft />
                    Voltar para login
                </a>
            </Content>
        </Container>
    );
}

export default SignUp;
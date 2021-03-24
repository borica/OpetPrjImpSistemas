import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignInFormData {
    username: string
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();

    const history = useHistory();

    const hundleSubmit = useCallback( async (data: SignInFormData) => {
        try{
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                username: Yup.string().required('Username obrigatório.'),
                password: Yup.string().required('Senha obrigatória.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({ username: data.username, password: data.password});

            history.push('/dashboard')
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro na autenticação.',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
            });
        }
    }, [signIn, addToast, history]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <Form ref={formRef} onSubmit={hundleSubmit} >
                        <h1>Faca seu Login</h1>

                        <Input name='username' icon={FiUser} placeholder='Username' />
                        <Input name='password' icon={FiLock} type='password' placeholder='Senha' />

                        <Button type='submit'>Entrar</Button>
                    </Form>

                    <Link to='/signup'>
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
)};

export default SignIn;
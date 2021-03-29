import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/toast'

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './style';

interface SignUpFormData {
    name: string;
    email: string;
    username: string;
    password: string;
}

const Forgot: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const hundleSubmit = useCallback( async (data: SignUpFormData) => {
        try{
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório.').email('Digite um e-mail valido.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users/forgot', data);

            history.push('/');

            addToast({
                type: 'success',
                title: 'Email enviado com sucesso.',
                description: 'Verifique o seu e-mail informado!'
            })
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao enviar email.',
                description: 'Ocorreu um erro ao enviar email, tente novamente.',
            });
        }
    }, [addToast, history]);

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <Form ref={formRef} onSubmit={hundleSubmit}>
                        <h1>Redefir senha</h1>

                        <Input name='email' icon={FiMail} placeholder='E-mail' />

                        <Button type='submit'>Enviar</Button>
                    </Form>

                    <Link to='/'>
                        <FiArrowLeft />
                        Voltar para login
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
}

export default Forgot;
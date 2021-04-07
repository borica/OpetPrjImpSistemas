import styled, { keyframes }  from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/signup-background.svg';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 700px;

`;

const appearFromRigth = keyframes`
    from{
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${appearFromRigth} 1s;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 80px;
            color: #00bfa6;
        }
    }

    a {
        color: #00bfa6;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;

        &:hover {
            color: ${shade(0.2, '#00bfa6')}
        }

        svg {
            margin-right: 16px;
        }
    }

    select {
        background-color: #F0F0F5;
        border: 2px solid ${shade(0.1, '#F0F0F5')};
        border-radius: 10px;
        padding: 16px;
        width: 100%;
        color: #00bfa6;
        margin-top: 8px;
        margin-bottom: 8px;
        font-family: 'Roboto Slab', serif;
        font-size: 16px;

        -webkit-appearance: none;  /* Remove estilo padrão do Chrome */
        -moz-appearance: none; /* Remove estilo padrão do FireFox */
        appearance: none; /* Rem    ove estilo padrão do FireFox*/

        .course {
            border: 2px solid ${shade(0.1, '#F0F0F5')};
            color: #666360;
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signUpBackgroundImg}) no-repeat center;
`;
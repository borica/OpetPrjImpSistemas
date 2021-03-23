import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
    isFocused: boolean;
    isField: boolean;
}

export const Container = styled.div<ContainerProps>`
    background-color: #F0F0F5;
    border-radius: 10px;
    padding: 16px;
    width: 100%;

    border: 2px solid ${shade(0.1, '#F0F0F5')};
    color: #666360;

    display: flex;
    align-items: center;

    & + div {
        margin-top: 8px;
    }

    ${ props => props.isFocused  && css`
        color: #00bfa6;
        border-color: #00bfa6;
    `}

    ${ props => props.isField  && css`
        color: #00bfa6;
    `}

    input {
        background: transparent;
        flex: 1;
        border: 0;
        color: #00bfa6;

        &::placeholder {
            color: #666360;
        }
    }

    svg {
        margin-right: 16px;
    }
`;
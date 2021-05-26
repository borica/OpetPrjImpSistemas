import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    width: 100%;
    height: 70px;
    float: right;
    position: fixed;
`;

export const HeaderBody = styled.header`
    padding: 32px 0;
    background: ${shade(0.1, '#F0F0F5')};
    display: flex;

    > div {
        flex: 1;
        margin-left: 300px 
    }
`;

export const HeaderContenter = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    button {
        margin-left: auto;
        background: transparent;
        border: 0;

        svg {
            color: #28262E;
            width: 20px;
            height: 20px;
        }
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 80px;

    img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;

        span {
            color: #666360;
        }

        strong {
            color: #00bfa6;
        }
    }
`;




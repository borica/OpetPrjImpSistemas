import { shade } from 'polished';
import styled from 'styled-components';


export const Container = styled.div`
    width: 312px;
    height: 100%;
    position: fixed;
    background: ${shade(0.1, '#F0F0F5')};

    > a {
        width: 100%;
        cursor: pointer;
        float: left;
        display: flex;
        justify-content: center;
        top: 0px;
        margin-bottom: 45px;
    }
`;
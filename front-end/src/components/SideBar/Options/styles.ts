import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface OptionProps {
    isFocused: Boolean;
}


export const Container = styled.div<OptionProps>`  
    width: 312px;
    height: 60px;

    a {
        width: 100%;
        height: 100%;
        float: left;
        padding-left: 53px;
        color: #00bfa6;
        cursor: pointer;
        display: flex;
        font-size: 15px;
        align-items: center;
        text-decoration: none !important;
        margin-right: 26px;
        float: left;
        transition: all 0.2s;

        svg {
            color: #00bfa6;
            margin-right: 26px;
        }

        &:hover {
            background: ${shade(0.1, '#00bfa6')};
            color: #F0F0F5;
            
            svg {
                background: ${shade(0.1, '#00bfa6')};
                color: #F0F0F5;
            }
        }
    }

    ${ props => props.isFocused  && css`
        a {
            width: 100%;
            height: 100%;
            background: ${shade(0.1, '#00bfa6')};
            color: #F0F0F5;
            cursor: pointer;
            display: flex;
            font-size: 15px;
            text-decoration: none;

            svg {
                background: ${shade(0.1, '#00bfa6')};
                color: #F0F0F5;
                float: left;
            }
        }
    `}

`;
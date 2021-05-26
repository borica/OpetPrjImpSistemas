import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    width: calc(100% - 312px);
    float: right;
    padding-bottom: 0px;
    position: absolute;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

export const Content = styled.div`
    width: 100%;
    min-height: calc(100vh - 164px);
    height: 100%;
    margin-left: 312px;
    float: left;
    background: ${shade(0.1, '#F0F0F5')};
    margin-top: 120px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 70px;
`;

export const ButtonNewUser = styled.div`
    width: 100%;
    margin-top: -30px;
    float: left;

    a {
        width: 190px;
        height: 55px;
        border-radius: 4px;
        border-color: transparent;
        background: #18ECB4;
        color: #121051;
        font-size: 12px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        float: right;
        text-decoration: none;
        transition: opacity 0.2s;

        &:hover {
            opacity: 0.8;
        }
    }
`;

export const AreaUsers = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    float: left;
    margin-top: 80px;
    height: calc(100vh - 270px);
    padding-right: 12px;
    overflow: scroll;

    &::-webkit-scrollbar {
        height: 6px;
        width: 6px;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #18ECB4;
        width: 5px;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #677894;
    }
`;

export const HeaderUser = styled.div`
    min-width: 1000px;
    width: 100%;
    height: 30px;
    padding-left: 12px;
    padding-right: 12px;
    color: #00bfa6;
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 12px;
    float: left;

    div {
        width: 20%;
        text-align: center;
        float: left;
        font-size: 12px;
        position: relative;
    }
`;

export const CardUser = styled.div`
    min-width: 1000px;
    width: 100%;
    height: 60px;
    padding-left: 12px;
    padding-right: 6px;
    background: #00bfa6;
    border-radius: 10px;
    color: white;
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-top: 12px;

    h1 {
        width: 20%;
        text-align: center;
        float: left;
        font-size: 12px;
    }

    > div {
        width: 20%;
        text-align: center;
        float: left;
        font-size: 12px;
        position: relative;
    }

    & + & {
        margin-top: 10px;
    }

    &:last-child {
        margin-bottom: 15px;
    }
`;

export const BottonsCardUser = styled.div`
    width: 20%;
    margin: 10px;
    height: 100%;
    display: flex;

    > button {
        width: 100%;
        height: 48px;
        background: #00F819;
        color: white;
        font-size: 12px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        border-radius: 4px;
        border-color: transparent;

        padding-left: 12px;
        padding-right: 12px;

        text-decoration: none;
        text-align: center;

        margin-top: 6px;
        margin-left: 10px;
        margin-right: 10px;

        transition: opacity 0.2s;

        &:hover {
            opacity: 0.8;
        }


        h1 {
            margin-left: 12px;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        

         & + button {
            width: 100%;
            height: 48px;
            background: #FF0800;
            color: white;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 4px;
            border-color: transparent;
            padding-left: 12px;
            padding-right: 12px;
            text-decoration: none;
            border-color: transparent;

            transition: opacity 0.2s;

            &:hover {
                opacity: 0.8;
            }

            h1 {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
        }
    }
`;
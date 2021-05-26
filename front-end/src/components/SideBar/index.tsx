import React, { useCallback, useEffect, useState } from 'react';

import { AiOutlineHome } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import Option from './Options';

import { Container } from './styles';

import LogoMenu from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const SideBar: React.FC = () => {
    const { user } = useAuth();

    const [focusedHome, setFocusedHome] = useState(false);
    const [focusedUsers, setFocusedUsers] = useState(false);

    const setFocused = useCallback(() => {
        const option = window.location.pathname.split('/')[1];

        switch (option) {
            case 'dashboard':
                setFocusedHome(true);
            break;
            case 'users':
                setFocusedUsers(true);
            break;
        }
    }, []);

    useEffect(() => {
        setFocused();
    }, [setFocused]);

    return (
        <Container>
            <Link to="dashboard">
                <img src={LogoMenu} alt="Logo" />
            </Link>

            <Option icon={AiOutlineHome} to="dashboard" name="Home" focused={focusedHome} />
            {!!user.isAdmin ? 
                <Option icon={FiUsers} to="users" name="Users" focused={focusedUsers} />
                :
                ''
            }
        </Container>
    )
}

export default SideBar;
import React from 'react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container, HeaderBody, HeaderContenter, Profile } from './styles';

const Header: React.FC = () => {
    const { signOut, user } = useAuth();

    return (
        <Container>
            <HeaderBody>
                <HeaderContenter>
                    <Profile>
                        <img src={user.avatar_url} alt={user.name}/>
                        <div>
                            <span>Bem-vindo</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContenter>
            </HeaderBody>
        </Container>
    );
};


export default Header;
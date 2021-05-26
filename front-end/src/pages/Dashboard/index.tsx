import React from 'react';

import { Container } from './styles';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

const Dashboard: React.FC = () => {

    return (
        <Container>
            <Header />
            <SideBar />
        </Container>
    );
};

export default Dashboard;
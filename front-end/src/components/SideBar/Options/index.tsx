import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Link } from 'react-router-dom';

import { Container } from './styles';

interface OptionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    to: string;
    icon: string | React.ComponentType<IconBaseProps>;
    name: string;
    focused: Boolean;
}

const Option: React.FC<OptionProps> = ({ to, name, icon: Icon, focused }) => {

    return (
        <Container isFocused={focused}>
            <Link data-cy={name} to={to}>
                {typeof Icon === 'string' ?
                    <img src={Icon} alt="Home" /> : <Icon size={22} />
                }
                {name}
            </Link>
        </Container>
    )
}

export default Option;
import React, { FC } from 'react';
import styled from '@emotion/styled';

interface GameOptionsProps {
    children: React.ReactNode;
}

const GameOptions:FC<GameOptionsProps> = ({children}) => {
    const GameOptionsWrap = styled.div`
        width: 699px;
        height: 660px;
        background: #FFFFFF;
        border-radius: 40px;
        border: 20px solid #7F75F0;  
        position: absolute;  
        display: flex;
        flex-direction: column;
        align-items: center;
    `;
    return (
        <GameOptionsWrap>
            {children}
        </GameOptionsWrap>
    );
};

export default GameOptions;
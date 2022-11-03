import styled from '@emotion/styled';
import React, { FC, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';

interface GameItemProps {
    className: string;
    currentGameTheme: string;
    item: number;
    imageNumber: string;
}

const GameItem:FC<GameItemProps> = ({className, currentGameTheme, item, imageNumber}) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'div',
        item: {item: item, imageNumber: imageNumber},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    const GameItem = styled.div`
        width: 157px;
        height: 158px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        &.first {
            left: 60px;
            top: 100px;
        }
        &.second {
            left: 270px;
            top: 0;
        }
        &.third {
            left: 400px;
            top: 135px;
        }
        &.forth {
            left: 514px;
            top: 0;
        }
        &.fifth {
            left: 738px;
            top: 93px;
        }
        &.off {
            visibility: hidden;
        }
    `;
    const GameItemContainer = styled.div`
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    const GameItemNumber = styled.p`
        font-family: 'Calibri';
        font-style: normal;
        font-weight: 400;
        font-size: 56px;
        letter-spacing: 2px;    
        color: #FFFFFF;    
        -webkit-text-stroke: 5px solid #242546;
        position: absolute;
    `;
    const GameItemImage = styled.img`
        position: absolule;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    `;
    return (
        <GameItem ref={drag} className={className}>
            <GameItemContainer>
                <GameItemImage src={`/gameThemes/${currentGameTheme}/items/item${imageNumber}.png`}/>
                <GameItemNumber>{item}</GameItemNumber>
            </GameItemContainer>
        </GameItem> 
    );
};

export default GameItem;
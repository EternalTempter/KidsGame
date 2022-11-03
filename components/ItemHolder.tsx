import styled from '@emotion/styled';
import React, { FC, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { foundedImage, gameItem } from '../pages/Game';

interface ItemHolderProps {
    children: React.ReactNode
    currentGameTheme: string
    setGameItems: (obj: gameItem[]) => void
    gameItems: gameItem[]
    foundedItems: foundedImage[];
    setFoundedItems: (value: foundedImage[]) => void
}

const ItemHolder:FC<ItemHolderProps> = ({children, currentGameTheme, setGameItems, gameItems, setFoundedItems, foundedItems}) => {
    const [{isOver}, drop] = useDrop(() => ({
        accept: "div",
        drop: (item: {item: string, imageNumber: string}) => pasteItem(item.item, item.imageNumber),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    function pasteItem(value: string, imageNumber: string) {
        if(children === value) {
            setGameItems(gameItems.filter(item => item.value !== Number(value)))
            let obj:foundedImage = {value: Number(value), imageNumber: Number(imageNumber)};
            setFoundedItems([...foundedItems, obj])
        }
    }

    function isValueExist() {
        return foundedItems.filter(elem => elem.value === Number(children)).length !== 0;
    }

    function getImageNumber() {
        return foundedItems.filter(elem => elem.value === Number(children))[0].imageNumber;
    }
    
    const ItemHolder = styled.div`
        width: 131px;
        height: 131px;
        border-radius: 50%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.06);
        box-shadow: inset 0px 4px 25px rgba(0, 0, 0, 0.25);
        margin: 0 2px;
        // color: transparent;
    `;
    const ItemHolderBackgroundImage = styled.img`
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    `;
    const ItemHolderValue = styled.p`
        font-family: 'Calibri';
        font-style: normal;
        font-weight: 400;
        font-size: 56px;
        letter-spacing: 2px;    
        color: #FFFFFF;    
        -webkit-text-stroke: 5px solid #242546;
        position: absolute;
        z-index: 999;
    `;
    return (
        <ItemHolder ref={drop}>
            {isValueExist() &&
                <>
                    <ItemHolderBackgroundImage src={`/gameThemes/${currentGameTheme}/items/item${getImageNumber()}.png`}/>
                    <ItemHolderValue>{children}</ItemHolderValue>
                </>
            }
        </ItemHolder>
    );
};

export default ItemHolder;
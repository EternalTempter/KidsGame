import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import { useRouter } from 'next/router';
import GameItem from '../components/GameItem';
import ItemHolder from '../components/ItemHolder';
import GameVictoryModal from '../components/GameVictoryModal';

export type gameItem = {
    value: number;
    index: number
    imageNumber: number
}

export type foundedImage = {
    value: number;
    imageNumber: number
}

const Game = () => {
    const router = useRouter();

    const [gameThemes, setGameThemes] = useState(['coins', 'cookies', 'toys']);
    const [currentGameTheme, setCurrentGameTheme] = useState(gameThemes[Math.floor(Math.random() * (gameThemes.length - 1 - 0 + 1) + 0)])

    const {itemsCount, gameValues, gameMode} = router.query;
    const [items, setItems] = useState<number[]>([]);
    const [gameItems, setGameItems] = useState<gameItem[]>([]);
    const [foundedItems, setFoundedItems] = useState<foundedImage[]>([]);
    const [itemClasses, setItemClasses] = useState(['first', 'second', 'third', 'forth', 'fifth']);
    const [edgeElementImageSrc, setEdgeElementImageSrc] = useState(Math.floor(Math.random() * (3 - 1 + 1) + 1));

    const [isGameVictoryModalVisible, setIsGameVictoryModalVisible] = useState(false);

    const [maxValue, setMaxValue] = useState<number>();
    const [minValue, setMinValue] = useState<number>();

    useEffect(() => {
        if(itemsCount && gameValues) {
            let array: number[] = [];
            for(let i = 0; i <= Number(itemsCount) + 1; i++) {
                if(gameValues === '1') array.push(1);
                else if(gameValues === '2') array.push(getUniqueValue(array, 1, 9))
                else if(gameValues === '3') array.push(getUniqueValue(array, 10, 19))
                else if(gameValues === '4') array.push(getUniqueValue(array, 20, 50))
                else if(gameValues === '5') array.push(getUniqueValue(array, 51, 99))
                else array.push(getUniqueValue(array, 100, 999))
            }
            let gameArray: gameItem[] = [];
            array.forEach((value, index) => gameArray.push({value: value, index: index, imageNumber: Math.floor(Math.random() * (3 - 1 + 1) + 1)}))
            setItems(array);
            setGameItems(gameArray);
        }
    }, [itemsCount, gameValues]);

    useEffect(() => {
        if(items.length !== 0) {
            setMaxValue(Math.max(...items));
            setMinValue(Math.min(...items));
        }
    }, [items])

    useEffect(() => {
        if(foundedItems.length === Number(itemsCount) + 1) {
            setIsGameVictoryModalVisible(true);
        }
    }, [foundedItems])

    function getUniqueValue(array: number[], min: number, max: number) : number {
        let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        return array.includes(randomNumber) ? getUniqueValue(array, min, max) : randomNumber;
    }

    const GameWrap = styled.div`
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    `;
    const BackgroundImage = styled.img`
        width: 100%;    
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    `;
    const GameField = styled.div`
        width: 933px;
        margin-top: 135px;
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
    `;
    const GameMode = styled.div`
        margin-top: 400px;
        width: 360px;
        height: 70px;
        position: relative;
        &.ascending {
            align-self: flex-start;
            margin-left: 26px;
        }
        &.descending {
            align-self: flex-end;
            margin-right: 26px;
        }
    `;
    const GameModeImage = styled.img`
        position: absolule;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        &.ascending {
            transform: rotateY(0deg);
        }
        &.descending {
            transform: rotateY(180deg);
        }
    `;
    const GameModeLabel = styled.p`
        position: absolute;
        left: 0;
        top: 0;
        font-family: 'Calibri';
        font-style: normal;
        font-weight: 400;
        font-size: 36px;
        color: #FFFFFF;
        &.ascending {
            margin: 10px 0 0 0;
        }
        &.descending {
            margin: 10px 0 0 120px;
        }
    `;
    const ItemsHolder = styled.div`
        margin-top: 20px;
        width: 890px;
        height: 223px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: center;
    `;
    const ItemsHolderBackgroundImage = styled.img`
        position: absolule;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    `;
    const Items = styled.div`
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    `;
    const Item = styled.div`
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
    `;
    const ItemBackgroundImage = styled.img`
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    `;
    const ItemValue = styled.p`
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
        <DndProvider backend={HTML5Backend}>
            <GameWrap>
                {isGameVictoryModalVisible && <GameVictoryModal closeModal={setIsGameVictoryModalVisible}/>}
                <BackgroundImage src={`/gameThemes/${currentGameTheme}/background.png`}/>
                <GameField>
                    {gameMode === 'ascending' && gameItems.filter(elem => elem.value !== minValue).map((item, index) => 
                        <GameItem 
                            imageNumber={String(item.imageNumber)}
                            className={itemClasses[item.index]} 
                            currentGameTheme={currentGameTheme} 
                            item={item.value}
                        />    
                    )}
                    {gameMode === 'descending' && gameItems.filter(elem => elem.value !== maxValue).map((item, index) =>  
                        <GameItem 
                            imageNumber={String(item.imageNumber)}
                            className={itemClasses[item.index]} 
                            currentGameTheme={currentGameTheme} 
                            item={item.value}
                        />
                    )}
                <GameMode className={gameMode === 'ascending' ? 'ascending' : 'descending'}>
                    <GameModeImage 
                        src='/gameModeArrow.png' 
                        className={gameMode === 'ascending' ? 'ascending' : 'descending'}
                    />
                    <GameModeLabel className={gameMode === 'ascending' ? 'ascending' : 'descending'}>
                        {gameMode === 'ascending' ? 'По возрастанию' : 'По убыванию'}
                    </GameModeLabel>
                </GameMode>
                <ItemsHolder>
                    <ItemsHolderBackgroundImage src={`/gameThemes/${currentGameTheme}/itemsHolder.png`}/>
                    <Items>
                        {gameMode === 'ascending' && 
                            <Item>
                                <ItemValue>{minValue}</ItemValue>
                                <ItemBackgroundImage src={`/gameThemes/${currentGameTheme}/items/item${edgeElementImageSrc}.png`}/>
                            </Item>
                        }
                        {gameMode === 'ascending' && items.filter(elem => elem !== minValue).sort((a,b) => a - b).map((item, index) => 
                            <ItemHolder 
                                currentGameTheme={currentGameTheme} 
                                setGameItems={setGameItems}
                                gameItems={gameItems}
                                foundedItems={foundedItems}
                                setFoundedItems={setFoundedItems}
                            >
                                {item}
                            </ItemHolder>   
                        )}
                        {gameMode === 'descending' && items.filter(elem => elem !== maxValue).sort((a,b) => a - b).map((item, index) => 
                            <ItemHolder 
                                currentGameTheme={currentGameTheme} 
                                setGameItems={setGameItems}
                                gameItems={gameItems}
                                foundedItems={foundedItems}
                                setFoundedItems={setFoundedItems}
                            >
                                {item}
                            </ItemHolder>  
                        )}
                        {gameMode === 'descending' && 
                            <Item>
                                <ItemValue>{maxValue}</ItemValue>
                                <ItemBackgroundImage src={`/gameThemes/${currentGameTheme}/items/item${edgeElementImageSrc}.png`}/>
                            </Item>
                        }
                    </Items>
                </ItemsHolder>
                </GameField>
            </GameWrap>
        </DndProvider>
    );
};

export default Game;
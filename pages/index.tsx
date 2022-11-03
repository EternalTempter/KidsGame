import styled from '@emotion/styled';
import Router from 'next/router';
import { useState } from 'react';
import GameOptions from '../components/GameOptions';
import ProgressBar from '../components/ProgressBar';
import ProgressBarBox from '../components/ProgressBarBox';

export default function Home() {
  const [itemsCount, setItemsCount] = useState('4');
  const [gameValues, setGameValues] = useState('3');
  const [currentGameMode, setCurrentGameMode] = useState('descending');

  function startGame() {
    Router.push(`/Game?itemsCount=${itemsCount}&gameValues=${gameValues}&gameMode=${currentGameMode}`);
  }

  const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
    offset: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const BackgroundImage = styled.img`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  `;

  const Label = styled.h1`
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 44px;
    text-align: center;   
    color: #423F45;
    margin-top: 35px;
  `;

  const GameModeToggler = styled.div`
    display: flex;
    margin-top: 70px;
    width: 540px;
    justify-content: space-between;
  `;

  const GameModeButton = styled.button`
    border: none;
    cursor: pointer;
    font-family: 'Calibri';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #423F45;
    border-radius: 20px;
    padding: 3px 20px;

    &.enabled {
      background: #FFD748;
    }
    &.disabled {
      background: rgba(255, 215, 72, 0.56);
    }
  `;

  const StartGameButton = styled.button`
    border: none;
    cursor: pointer;
    background: #38DF7A;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    padding: 3px 70px;
    margin-top: 90px;
  `;

  return (
    <Wrap>
      <BackgroundImage src='/background1.jpg'/>
      <GameOptions>
        <Label>Кол-во предметов</Label>
        <ProgressBarBox values={['2', '3', '4', '5']}>
          <ProgressBar 
            min={1} 
            max={4} 
            value={itemsCount} 
            onChange={setItemsCount} 
            size={'366'}
          />
        </ProgressBarBox>
        <Label>Значения</Label>
        <ProgressBarBox values={['A', '9', '19', '50', '99', '999']}>
          <ProgressBar 
            min={1} 
            max={6} 
            value={gameValues} 
            onChange={setGameValues} 
            size={'531'}
          />
        </ProgressBarBox>
        <GameModeToggler>
          <GameModeButton 
            className={currentGameMode === 'ascending' ? 'enabled' : 'disabled'} 
            onClick={() => setCurrentGameMode('ascending')}
          >
            По возрастанию
          </GameModeButton>
          <GameModeButton 
            className={currentGameMode === 'descending' ? 'enabled' : 'disabled'} 
            onClick={() => setCurrentGameMode('descending')}
          >
            По убыванию
          </GameModeButton>
        </GameModeToggler>
        <StartGameButton onClick={startGame}>
          Играть
        </StartGameButton>
      </GameOptions>
    </Wrap>
  )
}

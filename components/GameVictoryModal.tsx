import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

interface GameVictoryModalProps {
    closeModal: (value: boolean) => void;
}

const GameVictoryModal:FC<GameVictoryModalProps> = ({closeModal}) => {
    const router = useRouter();

    function playAgaimHandler() {
        closeModal(true);
        router.push('/')
    }
    
    const ModalBackground = styled.div`
        position: absolute;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        offset: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(32, 21, 54, 0.6);
    `;
    const ModalBorder = styled.div`
        width: 660px;
        height: 520px;
        background: linear-gradient(#67DF89, #8D67DF00);
        display: flex;
        justify-content: center;
        border-radius: 40px;
        align-items: center;
        z-index: 1000;
    `;  
    const Modal = styled.div`
        position: relative;
        width: 620px;
        height: 480px;
        background: radial-gradient(384.16% 384.16% at 50% 50%, #FFFFFF 12.29%, #AA92D2 21.15%);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 40px;
    `;
    const Star = styled.img`
        position: absolute;
        transform: rotateY(-30deg);
        &.first {
            width: 107px;
            height: 103px;
            left: -40px;
            top: -40px;
        }
        &.second {
            width: 162px;
            height: 156px;
            right: -70px;
            top: 120px;
        }
        &.third {
            width: 162px;
            height: 156px;
            left: -80px;
            bottom: -30px;
        }
        &.forth {
            width: 90px;
            height: 86px;
            right: -40px;
            bottom: -20px;
        }
    `;
    const VictoryLabel = styled.div`
        font-family: 'Circe Rounded Alt';
        font-style: normal;
        font-weight: 400;
        font-size: 128px;
        background: linear-gradient(180deg, #FFF9D8 8.65%, #FFE44F 69.58%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    `;
    const VictoryDescriptionLabel = styled.div`
        font-family: 'Circe Rounded';
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 51px;
        text-align: center;
        color: #5F40A1;
        margin-top: 15px;
    `;
    const PlayAgainButton = styled.button`
        cursor: pointer;
        background: #2BD600;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        font-family: 'Circe Rounded Alt ';
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        color: #FFFFFF;
        margin-top: 80px;
        padding: 9px 66px;
        border: none;
    `;
    return (
        <ModalBackground>
            <ModalBorder>
                <Modal>
                    <Star src={`/star.png`} className="first"/>
                    <Star src={`/star.png`} className="second"/>
                    <Star src={`/star.png`} className="third"/>
                    <Star src={`/star.png`} className="forth"/>
                    <VictoryLabel>Победа!</VictoryLabel>
                    <VictoryDescriptionLabel>Молодец! Ты успешно справился с заданием!</VictoryDescriptionLabel>
                    <PlayAgainButton onClick={() => playAgaimHandler()}>Заново</PlayAgainButton>
                </Modal>
            </ModalBorder>
        </ModalBackground>
    );
};

export default GameVictoryModal;
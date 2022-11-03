import styled from '@emotion/styled';
import React, { FC } from 'react';

interface ProgressBarBoxProps {
    values: string[];
    children: React.ReactNode;
}

const ProgressBarBox:FC<ProgressBarBoxProps> = ({values, children}) => {
    const Wrap = styled.div`
        display: flex;
        align-items: center;
        flex-direction: column;
    `;
    const ProgressBarBoxValues = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
    `;
    const ProgressBarBoxValue = styled.p`
        font-family: 'Calibri';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
        text-align: center;      
        color: #4F4B61;
        margin: 0;
        padding: 0;
    `;

    return (
        <Wrap>
            <ProgressBarBoxValues>
                {values.map(value => 
                    <ProgressBarBoxValue>{value}</ProgressBarBoxValue>    
                )}
            </ProgressBarBoxValues>
            {children}
        </Wrap>
    );
};

export default ProgressBarBox;
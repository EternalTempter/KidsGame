import React, { FC } from 'react';
import styled from '@emotion/styled';

interface ProgressBarProps {
    min: number;
    max: number;
    value: string;
    onChange: (value: string) => void;
    size: string;
}

const ProgressBar:FC<ProgressBarProps> = ({min, max, value, onChange, size}) => {
    const Input = styled.input`
        -webkit-appearance: none;
        appearance: none;
        background: #FFD748;
        cursor: pointer;
        width: ${size}px;
        border-radius: 10px;
    `;
    return (
        <Input 
            type="range" 
            min={min} 
            max={max} 
            step={1} 
            value={value} 
            onChange={e => onChange(e.target.value)}
        />
    );
};

export default ProgressBar;
import css from '@emotion/css';
import chroma from 'chroma-js';
import React from 'react';
import { Colors, Margins, Paddings, Sizes, Typography } from '../constants';

const baseButton = [
  Paddings.vertical.xSmall,
  Paddings.horizontal.regular,
  Margins.right.regular,
  Typography.textSans,
  css`
    font-size: ${Sizes.regular};
    text-decoration: none;
  `,
  css`
    display: inline-block;
    border: none;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 2px 4px 0 rgba(0, 0, 0, 0.02),
      0 4px 10px 0 rgba(0, 0, 0, 0.015);
  `,
  css`
    cursor: pointer;
  `,
  css`
    transition: background-color 0.2s ease, transform 0.1s ease;
    transform: translateZ(0);
    outline: none;

    &:hover {
      transform: scale(1.01);
    }

    &:active {
      transform: scale(0.99);
    }
  `,
];

function ButtonBackground(color: string, { textColor = '#fff' } = {}) {
  return css`
    background-color: ${color};
    color: ${textColor};

    &:hover {
      background-color: ${chroma(color)
        .darken(0.3)
        .hex()};
    }
  `;
}

export const ButtonStyles = {
  primary: [baseButton, ButtonBackground(Colors.accentMedium)],
  secondary: [
    baseButton,
    ButtonBackground('#e9e9ee', {
      textColor: Colors.text,
    }),
  ],
};

interface ButtonProps {
  type?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function Button({ type = 'primary', children }: ButtonProps) {
  return <button css={ButtonStyles[type]}>{children}</button>;
}

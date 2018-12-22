import * as React from 'react';
import { Root, Routes } from 'react-static';
import '../static/reset.css';
import '../static/style.css';
import Header from '../components/Header';
import { Global } from '@emotion/core';
import { Margins, Typography } from '../style/constants';

export default function App() {
  return (
    <Root>
      <Header />
      <Routes />
    </Root>
  );
}

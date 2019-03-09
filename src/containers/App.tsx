import * as React from 'react';
import { Root, Routes } from 'react-static';
import Header from '../components/Header';
import '../static/katex.min.css';
import '../static/reset.css';
import '../static/style.css';
import '../static/syntax-github.css';
import { Containers } from '../style/constants';

export default function App() {
  return (
    <Root>
      <Header />
      <main css={Containers.wrap}>
        <Routes />
      </main>
    </Root>
  );
}

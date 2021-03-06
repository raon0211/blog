import React, { useState } from 'react';
import { Root, Routes } from 'react-static';
import Header from '../components/Header';
import '../static/katex.min.css';
import '../static/reset.css';
import '../static/style.css';
import '../static/syntax-github.css';
import { Containers } from '../style/constants';
import { Location } from '@reach/router';
import { Flipper } from 'react-flip-toolkit';
import { PoseGroup } from 'react-pose';

export default function App() {
  return (
    <Location>
      {({ location }) => {
        const key = location.pathname;

        return (
          <Flipper flipKey={key}>
            <Root>
              <Header />
              <main css={Containers.wrap}>
                <PoseGroup>
                  <Routes key={key} />
                </PoseGroup>
              </main>
            </Root>
          </Flipper>
        );
      }}
    </Location>
  );
}

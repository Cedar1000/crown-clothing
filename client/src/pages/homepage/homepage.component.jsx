import React, { Profiler } from 'react';

import Directory from '../../components/directory/directory.component';

import { HompageContainer } from './homepage.styles';

import './homepage.styles.scss';

const Homepage = () => (
  <HompageContainer>
    <Profiler
      id="Directory"
      onRender={(id, phase, actualDuration) => {
        console.log({ id, phase, actualDuration });
      }}
    >
      <Directory />
    </Profiler>
  </HompageContainer>
);
export default Homepage;

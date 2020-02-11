import React from 'react';
import LandingPage from './components/LandingPage';
import SpecificUser from './components/SpecificUser';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/user/:id' component={SpecificUser} />
    </>
  );
};

export default App;

import React from 'react';
import './App.scss';
import Header from './shared/header/header';
import Patients from './components/patients/patients';

import Layout from './hoc/layout'
import Login from './components/login/login';

function App() {
  return (
    <div className="App">
      <Layout>
        {/* <Patients /> */}
        <Login />
      </Layout>
    </div>
  );
}

export default App;

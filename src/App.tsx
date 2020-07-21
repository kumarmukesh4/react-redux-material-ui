import React from 'react';
import './App.scss';
import Header from './shared/header/header';
import Patients from './components/patients/patients';

import Layout from './hoc/layout'

function App() {
  return (
    <div className="App">
      <Layout>
        <Patients />
      </Layout>
    </div>
  );
}

export default App;

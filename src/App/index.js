import React from 'react';
import './App.scss';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent'

function App() {
  return (
    <div className="App">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;

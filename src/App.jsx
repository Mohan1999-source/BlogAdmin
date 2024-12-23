import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Admin from './Pages/admin/admin';
import './App.css'; // Import CSS for centering

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Admin />
    </div>
  );
}

export default App;

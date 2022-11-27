import React from 'react';
import Footer from './components/Footer';
import AppRoutes from './components/Routes'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <AppRoutes></AppRoutes>
      <Footer></Footer>
      </header>
    </div>
  );
}

export default App;

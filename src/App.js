import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <HomePage />
        <Footer />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/home';
// import ColumnPage from './pages/column';
// import CookPage from './pages/cook';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={HomePage} />
            {/* <Route path="/column" component={ColumnPage} />
            <Route path="/cook" component={CookPage} /> */}
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

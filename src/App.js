import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import Row from './components/Row';
import Home from './pages/Home';
import Browse from './pages/Browse';
import MovieDetail from './pages/MovieDetail';
import MyList from './pages/MyList';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Banner />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/browse" component={Browse} />
          <Route path="/movie/:id" component={MovieDetail} />
          <Route path="/mylist" component={MyList} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
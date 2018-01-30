import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import './App.css';
import PackPage from './scenes/PackPage';
import CardPage from './scenes/CardPage';
import Navigator from './scenes/Navigator';
import AdminPackPage from './scenes/AdminPackPage';

class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="packs/:data_source">
                    <IndexRoute component={PackPage} />
                    <Route path="cards/:pack_id" component={CardPage} />
                </Route>
                <Route path="admin/uploadCards" component={AdminPackPage}>
                </Route>
            </Router>
        );
    }
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from './components/Landing';
import { Provider} from 'react-redux';
import store from './store';

import './App.css';

const App = () => {

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;

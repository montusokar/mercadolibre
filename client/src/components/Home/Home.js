import React from 'react';
import 'react-activity/dist/react-activity.css';
import './Home.scss'

import {
    Switch,
    Route,
    BrowserRouter as Router,
    withRouter
} from "react-router-dom";

import SearchBar from '../Search/SearchBar'
import ItemList from '../Item/ItemsList'
import ItemDetail from '../Item/ItemDetail'

function Home() {

    return (
        <div className="body-class">
            <Router>
                <header className="header">
                    <SearchBar />
                </header>

                <Switch>
                    <Route exact path={`/items`} component={withRouter(ItemList)} />
                    <Route path="/items/:itemId">
                        <ItemDetail />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}


export default Home;
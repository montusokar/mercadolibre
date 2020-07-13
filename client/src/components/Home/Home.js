import React from 'react';
import 'react-activity/dist/react-activity.css';
import './Home.scss'

import {
    Switch,
    Route,
    BrowserRouter as Router,
    withRouter
} from "react-router-dom";
import { Helmet } from "react-helmet";

import SearchBar from '../Search/SearchBar'
import ItemList from '../Item/ItemsList'
import ItemDetail from '../Item/ItemDetail'

function Home() {

    return (
        <div className="body-class">
            <Helmet htmlAttributes>
                    <html lang="en" />
                    <title>Mercadolibre</title>
                    <meta name="description" content="Democratizando el comercio." />
                </Helmet>
            <Router>
                <header className="header">
                    <SearchBar />
                </header>

                <Switch>
                    <Route exact path={`/items`} component={withRouter(ItemList)} />
                    <Route exact path="/items/:itemId">
                        <ItemDetail />
                    </Route>
                    <Route exact path={'/'}>
                    <div class="HomePage">
                        <img src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mlc-home-desktop-slider-picture-ff910373-615f-4828-95da-79ac2c6df959.jpg" alt="Mercado Shops"/>
                    </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}


export default Home;
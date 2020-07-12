import React, { useState } from 'react';
import 'react-activity/dist/react-activity.css';
import './SearchBar.scss'
import { GoSearch, GoX } from "react-icons/go";


import { useHistory, withRouter } from "react-router-dom";

function SearchBar() {
    let history = useHistory()

    const [query, setQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query && query !== '') {
            history.push({
                pathname: "/items",
                search: `?q=${query}`
            });
        }
    }

    return (<div className='Header' >
        <div className='Container'>
            <a className="LogoNavigator" href="//www.mercadolibre.cl">
                <img src='https://http2.mlstatic.com/frontend-assets/ui-navigation/5.7.0/mercadolibre/logo__large_plus.png' alt='mercadolibre' />
            </a>
            <form onSubmit={(event) => handleSubmit(event)} className="SearchBar">
                <input type="text" placeholder="Nunca dejes de buscar" onChange={(event) => setQuery(event.target.value)} className="SearchInput" />
                {query !== '' ?
                    <button className="IconButton" >
                        <GoX size={10} className="Icon" />
                    </button> : null}
                <button type="submit" className="IconButton" >
                    <GoSearch size={20} className="Icon" />
                </button>
            </form>
        </div>
    </div>)
}

export default withRouter(SearchBar);
import React, { useState } from 'react';
import 'react-activity/dist/react-activity.css';



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

    return (<div className='searchbar-class'>
        <form onSubmit={(event) => handleSubmit(event)}>
            <input type="text" placeholder="nunca dejes de buscar" onChange={(event) => setQuery(event.target.value)} />
            <input type="submit" value="Submit" />
        </form>
    </div>)
}

export default withRouter(SearchBar);
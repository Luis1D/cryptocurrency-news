import React, { useState, useEffect, useContext } from 'react';
import articleContext from '../contexts/articleContext';

const Search = () => {
    const { batchOne } = useContext(articleContext);
    const [filter, setFilter] = useState("");
    
    const handleChange = (e) => {
        let value = e.target.value;
        setFilter(value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(filter);
    }
    return (
        <div id="Search">
            <form onSubmit={ handleSubmit }>
                <input
                    value={ filter }
                    type="text"
                    placeholder="Search"
                    onChange={ handleChange }
                />
            </form>
        </div>
    )
}

export default Search;
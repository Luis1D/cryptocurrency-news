import React, { useState, useEffect, useContext } from 'react';
import articleContext from '../contexts/articleContext';

const Search = () => {
    const {  rawArticles, setNewsArticles } = useContext(articleContext)
    const [filter, setFilter] = useState("");
    
    const handleChange = (e) => {
        let value = e.target.value;
        setFilter(value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        const filteredList = rawArticles.filter(item => {
            return item.body.includes(filter);    
        })
        setNewsArticles(filteredList);
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
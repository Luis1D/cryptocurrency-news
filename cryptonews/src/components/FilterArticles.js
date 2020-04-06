import React, { useContext } from 'react';
import articleContext from '../contexts/articleContext';

const FilterArticles = () => {
    const {  rawArticles, setNewsArticles } = useContext(articleContext)

    const filterArticle = coin => {
        const filteredList = rawArticles.filter(item => {
            return item.categories.includes(coin);    
        })
        setNewsArticles(filteredList);
    }

    return (
        <div id="FilterArticles">
            <div className="btn-container">
                <button onClick={ () => filterArticle("BTC") }>BTC</button>
                <button onClick={ () => filterArticle("LTC") }>LTC</button>
                <button onClick={ () => filterArticle("ETH") }>ETH</button>
                <button onClick={ () => filterArticle("XRP") }>XRP</button>
            </div>
        </div>
    )
}

export default FilterArticles;
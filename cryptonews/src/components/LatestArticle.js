import React, { useState, useContext, useEffect } from 'react';
import articleContext from '../contexts/articleContext.js';
import useDecodeHTML from '../hooks/useDecodeHTML.js';

const LatestArticle = () => {
    const {latestArticle} = useContext(articleContext);
    const [decode, setDecode] = useDecodeHTML();
    
    useEffect(() => {
        if(latestArticle) {
            setDecode(latestArticle[0].body);
        }
    },[latestArticle])

    return (
        <div id="LatestArticle">
        { latestArticle ?
            <div className="latest-article">
                <div className="article-header">
                    <h2>{ latestArticle[0].source_info.name }</h2>
                </div>
                <div className="title-img-container">
                    <div className="container">
                        <h1 className="article-title">{ latestArticle[0].title }</h1>
                        <p className="body">{ decode }</p>
                        <a href={ latestArticle[0].guid } target="_blank" rel="noopener noreferrer" className="read-more">Read More..</a>
                    </div>
                    <div className="latest-article-img">
                        <img src={ latestArticle[0].imageurl } alt="latest"/>
                    </div>              
                </div>
            </div>
            : null
        }
        </div>
    )
}

export default LatestArticle;
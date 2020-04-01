import React, { useContext } from 'react';
import articleContext from '../contexts/articleContext.js';

const LatestArticle = () => {
    const {latestArticle} = useContext(articleContext);
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
                        <p className="body">{ latestArticle[0].body }</p>
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
import React, { useState, useContext } from 'react';
import articleContext from '../contexts/articleContext';

const Article = () => {
    const { batchOne, latestArticle } = useContext(articleContext);
    const [preview, setPreview] = useState({
        title: "",
        body: "",
        url: "",
        id: ""
    });
    const [open, setOpen] = useState("closed");
    const previewArticle = (preArticle) => {
        setPreview({ 
            title: preArticle.source,
            body: preArticle.body,
            url: preArticle.guid,
            id: preArticle.id
        });
        if(preview.body.length > 0) {
            setOpen("closed");
            setPreview({
                title: "",
                body: "",
                url: "",
                id: ""
            });
        } else {
            setOpen("opened");
        }
    }
    return (
        <div className="article-feed">

            {
            batchOne ?
            batchOne.map(article => {
                return <div className={ latestArticle === article.id ? "latest-article" : "Article"} onClick={ () => previewArticle(article) } key={ article.id }>
                            <div className="article-header">
                                <h2>{ article.source_info.name }</h2>
                                <h3 className="categories">{ article.categories }</h3>
                            </div>
                            <div className="title-img-container">
                                <div className="container">
                                    <h1 className="article-title">{ article.title }</h1>
                                </div>
                                {
                                    latestArticle === article.id ? 
                                    <div className="latest-article-img">
                                        <img src={ article.imageurl } alt="latest"/>
                                    </div>
                                    : null
                                }                
                            </div>
                            { preview.url.length !== 0 ?
                            <div className={ open }>
                                <div className="preview-container">
                                    <h1 className="preview-header">{ preview.title }</h1>
                                    <p className="preview-text">> { preview.body }</p>
                                    <a href={ preview.url } target="_blank" rel="noopener noreferrer">Read More...</a>
                                </div>
                            </div> : null
                            }
                </div>
            }) : <div className="loading-page">
                  <img
                    src={ require('../assets/Ellipsis-3.4s-167px.svg') }
                    alt="Loading..."
                    className="loading-spinner"
                  />
                </div>}
        </div>
    )
}

export default Article;
import React, { useState, useContext, useEffect } from 'react';
import articleContext from '../contexts/articleContext';
import useDecodeHTML from '../hooks/useDecodeHTML.js';

const Article = () => {
    const { newsArticles, latestArticle } = useContext(articleContext);
    const [decode, setDecode] = useDecodeHTML("");
    const [preview, setPreview] = useState({
        title: "",
        body: "",
        url: "",
        img: "",
        id: ""
    });
    const [open, setOpen] = useState("closed");
    const previewArticle = (preArticle) => {
        setDecode(preArticle.body)
        if(open === "opened") {
            setOpen("closed");
        } else {
            setOpen("opened");
            setPreview({
                title: preArticle.source,
                body: decode,
                url: preArticle.url,
                img: preArticle.imageurl,
                id: preArticle.id
            })
        }
    }
    return (
        <div className="article-feed">
            {
            newsArticles ?
            newsArticles.map(article => {
                return <div className={ latestArticle === article.id ? "latest-article" : "Article"} onClick={ () => previewArticle(article) } key={ article.id }>
                            <div className="article-header">
                                <h2>{ article.source_info.name }</h2>
                                {/* <h3 className="categories">{ article.categories }</h3> */}
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
                                    <p className="preview-text">> { decode }</p>
                                    <div className="link-container">
                                        <a href={ preview.url } target="_blank" rel="noopener noreferrer">Read More...</a>
                                        <button onClick={ () => setOpen(!open) } className="exit-btn">X</button>
                                    </div>
                                    {/* <img src={ preview.img } alt="article photo" className="preview-photo" /> */}
                                    {/* <div className="img-blend"></div> */}
                                </div>
                            </div> : null
                            }
                </div>
            }) : <div className="loading-page">
                    <img 
                        src={ require('../assets/astronaut.svg') }
                        alt="logo"
                        className="astronaut-logo"
                    />
                    <h1>CRPTOZ</h1>
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
import React, { useState, useContext } from 'react';
import articleContext from '../contexts/articleContext';

const Article = props => {
    const { batchOne, latestArticle } = useContext(articleContext);
    const [preview, setPreview] = useState({
        title: "",
        id: ""
    });
    const [open, setOpen] = useState("closed");

    // UNIX DATE CONVERSION
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date(props.date * 1000);
    let year = date.getFullYear();
    let month = months[date.getMonth()];
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let convertedDate = month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2);
    
    const previewArticle = (preArticle) => {
        const id = preArticle.id;
        setPreview({ title: preArticle.body, id: id });
        if(preview.title.length > 0) {
            setOpen("closed");
            setPreview({
                title: "",
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
                                <h3>{ convertedDate }</h3>
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

                            {
                                preview ?
                                    <div className={ open }>
                                        <div className="preview-container">
                                            <h1 className="preview-header">Preview</h1>
                                            <p className="preview-text">> { preview.title }</p>
                                            <a href={ article.guid } target="_blank" rel="noopener noreferrer">Read More...</a>
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
            }
        </div>
    )
}

export default Article;
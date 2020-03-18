import React, { useState } from 'react';

const Article = props => {
    
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
    
    const previewArticle = () => {
        const id = props.id;
        setPreview({ title: props.preview, id: id });
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
        <div className={ props.latestArticle === props.id ? "latest-article" : "Article"} onClick={ previewArticle }>
            <div className="article-header">
                <h2>{ props.source }</h2>
                <h3>{ convertedDate }</h3>
            </div>
            <div className="title-img-container">
                <div className="container">
                    <h1 className="article-title">{ props.title }</h1>
                </div>
                {
                    props.latestArticle === props.id ? 
                    <div className="latest-article-img">
                        <img src={ props.img } alt="latest"/>
                    </div>
                    : null
                }                
            </div>

            {preview ?
                <div className={ open }>
                    <p className="preview-text">> { preview.title }</p>
                    <a href={ props.url } target="_blank" rel="noopener noreferrer">Read More...</a>
                </div>
                    : null
                }
        </div>
    )
}

export default Article;
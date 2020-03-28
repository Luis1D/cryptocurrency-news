import React from 'react';

const FeaturedArticles = props => {
    const articles = props.featuredPost;
    console.log(props)
    return (
        <div id="FeaturedArticles">
            {
                articles.map(article => {
                    return <div className="article-container" key={ article.id }>
                        <div className="text-container">
                            <h1>{ article.source }</h1> 
                            <h2>{ article.title }</h2>
                        </div>
                        <img
                            src={ article.imageurl }
                            alt="article"
                        />
                    </div>
                })
            }
        </div>
    )
}

export default FeaturedArticles;
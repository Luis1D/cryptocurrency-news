import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Article from './components/Article.js';
import ChartComp from './components/ChartComp';
import './styles/app.scss';

function App() {
  const [articleCollection, setArticleCollection] = useState();
  const [latestArticle, setLatestArticle] = useState()
  const [priceData, setPriceData] = useState();

  useEffect(() => {
    axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
      .then(res => {
        const myData = res.data.Data;
        setArticleCollection(myData);
        setLatestArticle(myData[0])
        // console.log("RES: ", myData);
      })
      .catch(err => {
          console.log("ERROR: ", err);
      })

    axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,XRP,ADA&tsyms=USD,EUR')
      .then(res => {
        const myData = res.data.DISPLAY;
        setPriceData(myData);
        // console.log("PRICE-DATA:",myData)
      })
      .catch(err => {
        console.log("ERROR: ", err);
      })
      // window.onscroll = function() {myFunction()};
  },[]);

//   function myFunction() {
//     let header = document.getElementById("myHeader");
//     let sticky = header.offsetTop;

//     if (window.pageYOffset > sticky) {
//       header.classList.add("sticky");
//     } else {
//       header.classList.remove("sticky");
//     }
// }

  return (
    <div className="App">
      <header>
        <div className="logo-wrapper">
          <h1>CND</h1>
        </div>
      </header>
      <div id="myHeader">
        </div>

        {
          priceData ? <ChartComp 
          priceData={ priceData }
        /> : <span>Loading...</span>
        }

        { latestArticle ? articleCollection.map(article => {
          return <Article 
                  latestArticle = {latestArticle.id}
                  source={ article.source_info.name }
                  date={ article.published_on }
                  title={article.title}
                  url={ article.guid }  
                  img={ article.imageurl }
                  preview={ article.body }
                  id={ article.id }
                  key={ article.id }
                />
        }) : null}
      : 
        {/* // LOADING... */}
        <div className="loading-page">
          <h2>LOADING...</h2>
        </div>}
    </div>
  );
}

export default App;